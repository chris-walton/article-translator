import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models';

export class MessagesDataService {
  constructor(private readonly http: HttpClient) {}

  getLogsAsync(): Observable<Message[]> {
    return this.http.get<Message[]>('api/messages').pipe(
      map((messages) => {
        for (const message of messages) {
          if (typeof message.timestamp === 'string') {
            message.timestamp = new Date(message.timestamp);
          }
        }
        return messages;
      })
    );
  }

  putAsync(message: Message): Observable<void> {
    return this.http.put<void>('api/messages/' + message.id, message);
  }

  deleteAsync(messageId: string): Observable<void> {
    return this.http.delete<void>('api/messages/' + messageId);
  }
}
