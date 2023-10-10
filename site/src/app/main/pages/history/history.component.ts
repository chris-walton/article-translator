import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataServiceFactory } from '@at/core/data-services';
import { Message } from '@at/core/models';
import { Messages } from '@at/core/services';
import { NavComponent } from '@at/main/components/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash } from '@fortawesome/pro-solid-svg-icons';
import {
  NgbDropdownModule,
  NgbModal,
  NgbModalModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AiModelNamePipe } from './pipes/ai-model-name.pipe';
import { DateTextPipe } from './pipes/date-text.pipe';
import { MessageViewerComponent } from './components/message-viewer/message-viewer.component';
import { HistoryFilterPipe } from './pipes/history-filter.pipe';
import { AI_MODELS } from 'src/environments/globals';

const ALL_MODELS = { id: '', name: 'All Models' };

@Component({
  standalone: true,
  templateUrl: './history.component.html',
  imports: [
    AiModelNamePipe,
    DateTextPipe,
    FontAwesomeModule,
    NavComponent,
    NgbDropdownModule,
    NgbModalModule,
    NgbRatingModule,
    NgFor,
    NgIf,
    RouterModule,
    HistoryFilterPipe,
  ],
})
export class HistoryComponent {
  @Input() history!: Message[];

  aiModel = ALL_MODELS;

  readonly faEye = faEye;
  readonly faTrash = faTrash;
  readonly aiModels = [ALL_MODELS, ...AI_MODELS];
  readonly ratings = [
    {
      id: undefined,
      name: 'All Ratings',
    },
    { id: 5, name: 'Rating of 5' },
    { id: 4, name: 'Rating of 4+' },
    { id: 3, name: 'Rating of 3+' },
    { id: 2, name: 'Rating of 2+' },
    { id: 1, name: 'Rating of 1+' },
    { id: 0, name: 'Unrated' },
  ];
  rating = this.ratings[0];

  constructor(
    readonly cd: ChangeDetectorRef,
    private readonly data: DataServiceFactory,
    private readonly messages: Messages,
    private readonly modalService: NgbModal
  ) {}

  view(record: Message): void {
    const modalRef = this.modalService.open(MessageViewerComponent, {
      modalDialogClass: 'record-details-modal',
      size: 'lg',
      scrollable: true,
    });
    const comp = modalRef.componentInstance as MessageViewerComponent;

    comp.message = record;
    const sub = comp.ratingChanged.subscribe((rating) => {
      record.rating = rating;

      this.data.messages
        .putAsync(record)
        .subscribe(() => this.cd.detectChanges());
    });
    modalRef.closed.subscribe(() => sub.unsubscribe());
    modalRef.dismissed.subscribe(() => sub.unsubscribe());
  }

  delete(recordId: string): void {
    this.messages.confirm
      .show('Confirmation', 'Are you sure you want to remove this record?')
      .subscribe((answer) => {
        if (!answer) return;

        this.data.messages.deleteAsync(recordId).subscribe(() => {
          const index = this.history.findIndex((x) => x.id === recordId);

          if (index === -1) return;
          this.history.splice(index, 1);
          this.history = [...this.history];
          this.messages.notify.success('Record removed');
          this.cd.detectChanges();
        });
      });
  }
}
