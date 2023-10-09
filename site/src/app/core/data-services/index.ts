import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AiDataService } from './ai.data-service';

@Injectable({ providedIn: 'root' })
export class DataServiceFactory {
  readonly ai = new AiDataService(this.http);

  public constructor(private readonly http: HttpClient) {}
}
