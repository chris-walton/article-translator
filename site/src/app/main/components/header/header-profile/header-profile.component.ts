import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPowerOff, faUser } from '@fortawesome/pro-solid-svg-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderProfileHeaderComponent } from '../header-profile-header/header-profile-header.component';
import { HeaderProfilePictureComponent } from '../header-profile-picture.component';

@Component({
  standalone: true,
  selector: 'at-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
  providers: [],
  imports: [
    FontAwesomeModule,
    HeaderProfileHeaderComponent,
    HeaderProfilePictureComponent,
    NgbDropdownModule,
    NgIf,
    RouterModule,
  ],
})
export class HeaderProfileComponent {
  readonly user = toSignal(this.auth.user$);
  readonly faPowerOff = faPowerOff;
  readonly userIcon = faUser;
  isCollapsed = true;

  constructor(private readonly auth: AuthService) {}
}
