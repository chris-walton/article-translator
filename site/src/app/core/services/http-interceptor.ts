import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Logger } from './logger.service';
import { Messages } from './messages.service';

const noErrorUrls: string[] = [];

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly logger: Logger,
    private readonly messages: Messages
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url === 'uploadSaveUrl')
      return of(new HttpResponse({ status: 200 }));

    if (request.url.indexOf('api/') === 0) {
      request = request.clone({
        url: `${environment.apiUrl}/${request.url}`,
      });
    }
    //@ts-ignore
    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(request, err))
      );
  }

  private handleError(
    request: HttpRequest<any>,
    err: HttpErrorResponse
  ): Observable<void | null> {
    if (err.status === 404) return of(null);
    if (err instanceof HttpErrorResponse) {
      console.error(err);
      let showMessage = !this.isInList(noErrorUrls, request.url);

      if (showMessage) {
        const message =
          err.status === 401
            ? 'Your login has expired'
            : 'An unexpected server error has occurred';

        this.messages.notify.error(message);
      }

      this.logError(request.url, request.headers, err);
    }
    return throwError(err);
  }

  private isInList(list: string[], url: string) {
    url = url.toLowerCase();

    for (let i = 0; i < list.length; i++) {
      if (url.toLowerCase().indexOf(list[i]) > -1) {
        return true;
      }
    }
    return false;
  }

  private logError(
    url: string,
    reqHeaders: HttpHeaders,
    errorResponse: HttpErrorResponse
  ) {
    try {
      this.logger.error('Browser Error', {
        name: 'Http Error Response',
        exception: errorResponse,
        properties: {
          requestUrl: url,
          reqHeaders: this.headersToString(reqHeaders),
          errorResponse: this.stringifyError(errorResponse),
        },
      });
    } catch (e) {}
  }

  private stringifyError(err: Error) {
    if (!err) return null;
    var plainObject: Record<string, string> = {};

    for (const key of Object.getOwnPropertyNames(err)) {
      //@ts-ignore
      plainObject[key] = err[key];
    }
    return JSON.stringify(plainObject);
  }

  private headersToString(headers: HttpHeaders): string | null {
    if (headers == null) return null;
    const results: Record<string, string> = {};

    for (const key of headers.keys()) {
      const val = headers.get(key);
      if (val != null) results[key] = val;
    }
    return JSON.stringify(results);
  }
}
