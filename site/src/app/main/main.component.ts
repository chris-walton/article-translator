import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  template: `<div class="d-flex flex-column vh-100">
    <at-header />
    <div #body class="pd-x-20 flex-1-0-auto">
      <router-outlet />
    </div>
    <div
      class="flex-shrink-0 bg-white border-top ht-40 w-100 tx-12 pd-t-10 tx-center"
    >
      Copyright © {{ year }}
      <a href="/" class="text-primary">
        {{ appTitle }}
      </a>
      All rights reserved
    </div>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, NgIf, RouterModule],
})
export class MainComponent {
  readonly year = new Date().getFullYear();
  readonly appTitle = environment.appTitle;
}
