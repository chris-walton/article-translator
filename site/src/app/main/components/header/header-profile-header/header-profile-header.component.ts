import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { HeaderProfilePictureComponent } from '../header-profile-picture.component';

@Component({
  standalone: true,
  selector: 'at-header-profile-header',
  templateUrl: './header-profile-header.component.html',
  imports: [HeaderProfilePictureComponent, NgIf],
})
export class HeaderProfileHeaderComponent {
  @Input({ required: true }) user?: User;
}
