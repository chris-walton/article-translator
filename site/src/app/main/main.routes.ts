import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { historyResolver } from './services';

export const routes: Routes = [
  { path: '', redirectTo: '/prompt', pathMatch: 'full' },
  {
    path: '',
    canActivate: [authGuardFn],
    loadComponent: () =>
      import('./main.component').then((m) => m.MainComponent),
    children: [
      {
        path: 'prompt',
        loadComponent: () =>
          import('./pages/prompt/prompt.component').then(
            (m) => m.PromptComponent
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./pages/history/history.component').then(
            (m) => m.HistoryComponent
          ),
        resolve: {
          history: historyResolver,
        },
      },
    ],
  },
];
