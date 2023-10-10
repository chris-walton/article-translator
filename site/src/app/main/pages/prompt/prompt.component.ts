import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataServiceFactory } from '@at/core/data-services';
import { Message } from '@at/core/models';
import { IdService } from '@at/core/services';
import { NavComponent } from '@at/main/components/nav/nav.component';
import { FillElementDirective } from '@at/main/directives/fill-element.directive';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AI_MODELS } from 'src/environments/globals';

@Component({
  standalone: true,
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    FillElementDirective,
    FontAwesomeModule,
    NavComponent,
    NgbRatingModule,
    NgClass,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class PromptComponent implements OnInit {
  private message?: Message;

  userId?: string;

  readonly faSpinner = faSpinner;
  readonly processing = signal<boolean>(false);
  readonly error = signal<string | undefined>(undefined);
  readonly response = signal<string | undefined>(undefined);

  readonly form = new FormGroup({
    article: new FormControl<string>('', [Validators.required]),
    aiModel: new FormControl<string>('', [Validators.required]),
    system: new FormControl<string>('', [Validators.required]),
    prompt: new FormControl<string>('', [Validators.required]),
  });
  readonly aiModels = AI_MODELS;

  constructor(
    private readonly auth: AuthService,
    private readonly data: DataServiceFactory
  ) {
    this.reset();
  }

  ngOnInit(): void {
    this.auth.user$.pipe(first()).subscribe((user) => {
      this.userId = user!.name;
    });
  }

  run(): void {
    this.processing.set(true);
    this.response.set(undefined);

    this.message = {
      id: IdService.generate(),
      author: this.userId!,
      aiModel: this.form.value.aiModel!,
      article: this.form.value.article!,
      prompt: this.form.value.prompt!,
      system: this.form.value.system!,
      timestamp: new Date(),
    };
    this.data.ai
      .runOpenAiWorkerAsync({
        model: this.message.aiModel,
        messages: [
          {
            content: this.message.system,
            role: 'assistant',
          },
          {
            content: `${this.message.prompt}\n\n${this.message.article}`,
            role: 'user',
          },
        ],
      })
      .subscribe((response) => {
        if (response.error) {
          this.message!.errors = response.error;
          this.message!.success = false;

          this.error.set(response.error.message);
          this.response.set(undefined);
        } else {
          this.error.set(undefined);
          this.response.set(response.choices[0].message.content!);

          this.message!.results = response.choices[0].message.content!;
          this.message!.success = true;
        }

        this.processing.set(false);
        this.data.messages.putAsync(this.message!).subscribe();
      });
  }

  reset(): void {
    this.form.setValue({
      article: '',
      aiModel: '',
      system: 'You are a helpful assistant.',
      prompt: '',
    });
  }

  rate(rating: number): void {
    this.message!.rating = rating;

    this.data.messages.putAsync(this.message!).subscribe();
  }
}
