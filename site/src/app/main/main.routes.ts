import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

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
        data: {
          page: 'prompt',
        },
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./pages/history/history.component').then(
            (m) => m.HistoryComponent
          ),
        data: {
          page: 'history',
        },
      },
    ],
  },
];
