import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth : OktaAuth) { }

  // ngOnInit(): void {
  // }

  async ngOnInit() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name as string;
    }
  }

}
