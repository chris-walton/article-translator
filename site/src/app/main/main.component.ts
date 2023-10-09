import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  template: `<div class="d-flex flex-column vh-100">
    <at-header />
    <div #body class="pd-x-20">
      <router-outlet />
    </div>
    <at-footer />
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FooterComponent, HeaderComponent, NgIf, RouterModule],
})
export class MainComponent {}
