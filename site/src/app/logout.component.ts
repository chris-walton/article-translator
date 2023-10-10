import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  template: `<div class="w-100 text-center pd-t-200">
    <!--<kendo-loader type="infinite-spinner" themeColor="primary" size="large" />-->
    <br />
    <br />
    <h1>Logging Out...</h1>
  </div>`,
  imports: [FontAwesomeModule],
})
export class LogoutComponent implements OnInit {
  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
}
