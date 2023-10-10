import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataServiceFactory } from '@at/core/data-services';
import { Message } from '@at/core/models';

export const historyResolver: ResolveFn<Message[]> = () =>
  inject(DataServiceFactory).messages.getLogsAsync();
