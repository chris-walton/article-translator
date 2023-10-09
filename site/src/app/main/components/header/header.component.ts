import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { faBars } from '@fortawesome/pro-solid-svg-icons';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'at-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    HeaderProfileComponent,
    NgbDropdownModule,
    NgClass,
    NgForOf,
    NgIf,
    RouterModule,
  ],
})
export class HeaderComponent {
  readonly menuIcon = faBars;
  readonly appTitle = environment.appTitle;

  constructor(private readonly route: ActivatedRoute) {
  }
}
