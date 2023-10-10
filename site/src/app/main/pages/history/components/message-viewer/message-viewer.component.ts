import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Message } from '@at/core/models';
import { SafeHtmlPipe } from '@at/main/pipes/safe-html.pipe';
import { TextToHtmlPipe } from '@at/main/pipes/text-to-html.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NgbActiveModal,
  NgbModalModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AiModelNamePipe } from '../../pipes/ai-model-name.pipe';
import { DateTextPipe } from '../../pipes/date-text.pipe';

@Component({
  standalone: true,
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    AiModelNamePipe,
    DateTextPipe,
    FontAwesomeModule,
    NgbModalModule,
    NgbRatingModule,
    NgClass,
    NgFor,
    NgIf,
    SafeHtmlPipe,
    TextToHtmlPipe,
  ],
})
export class MessageViewerComponent {
  @Input({ required: true }) message?: Message;
  @Output() readonly ratingChanged = new EventEmitter<number>();

  constructor(readonly activeModal: NgbActiveModal) {}
}
