import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  OpenAiRequest,
  OpenAiResults,
  WorkerAiRequest,
  WorkerAiResults,
} from '../models';

export class AiDataService {
  constructor(private readonly http: HttpClient) {}

  runWorkerAiAsync(
    model: string,
    body: WorkerAiRequest
  ): Observable<WorkerAiResults> {
    return this.http
      .post<WorkerAiResults>('api/run/worker-ai', {
        model,
        body,
      })
      .pipe(
        map((answer) => {
          if (answer.success) {
            answer.result.response = answer.result.response.trim();
          }
          return answer;
        })
      );
  }

  runOpenAiWorkerAsync(body: OpenAiRequest): Observable<OpenAiResults> {
    return this.http.post<OpenAiResults>('api/run/open-ai', body).pipe(
      map((answer) => {
        if (answer.choices) {
          for (const choice of answer.choices) {
            if (choice.message.content)
              choice.message.content = choice.message.content.trim();
          }
        }
        return answer;
      })
    );
  }
}
