import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Messages {
  readonly notify = new Toasts();
  readonly confirm = new Confirm();
  readonly report = new Report();
}

class Toasts {
  info(label: string): void {
    //@ts-ignore
    Notiflix.Notify.info(label);
  }
  error(label: string): void {
    //@ts-ignore
    Notiflix.Notify.failure(label);
  }
  success(label: string): void {
    //@ts-ignore
    Notiflix.Notify.success(label);
  }

  block(className: string): void {
    //@ts-ignore
    Notiflix.Block.hourglass(className);
  }

  unblock(className: string): void {
    //@ts-ignore
    Notiflix.Block.remove(className);
  }
}

class Confirm {
  show(
    title: string,
    message: string,
    data?: Record<string, string>,
    yes = 'Yes',
    no = 'No'
  ): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      if (data) {
        for (const prop of Object.keys(data)) {
          message = message.replace(`{${prop}}`, data[prop]);
        }
      }

      //@ts-ignore
      Notiflix.Confirm.show(
        title,
        message,
        yes,
        no,
        () => {
          subscriber.next(true);
          subscriber.complete();
        },
        () => {
          subscriber.next(false);
          subscriber.complete();
        },
        {}
      );
    });
  }
}

class Report {
  failure(
    title: string,
    message: string,
    data?: Record<string, string>,
    okay = 'Okay'
  ): void {
    if (data) {
      for (const prop of Object.keys(data)) {
        message = message.replace(`{${prop}}`, data[prop]);
      }
    }
    //@ts-ignore
    Notiflix.Report.failure(title, message, okay);
  }

  success(
    title: string,
    message: string,
    data?: Record<string, string>,
    okay = 'Okay'
  ): void {
    if (data) {
      for (const prop of Object.keys(data)) {
        message = message.replace(`{${prop}}`, data[prop]);
      }
    }
    //@ts-ignore
    Notiflix.Report.success(title, message, okay);
  }
}
