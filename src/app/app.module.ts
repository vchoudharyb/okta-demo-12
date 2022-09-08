import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OktaAuth } from '@okta/okta-auth-js';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { Routes, Router, RouterModule } from '@angular/router';
import config from './app.config';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ OktaAuthGuard ]
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    OktaAuthModule
  ],
  providers: [
    { 
      provide: OKTA_CONFIG, 
      useFactory: () => {
        const oktaAuth = new OktaAuth(config.oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const triggerLogin = () => {
              // Redirect the user to your custom login page
              const router = injector.get(Router);
              router.navigate(['/login']);
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              // App initialization stage
              triggerLogin();
            } else {
              // Ask the user to trigger the login process during token autoRenew process
            //   const modalService = injector.get(SuiModalService);
            //   modalService
            //     .open(new ConfirmModal("Do you want to re-authenticate?", "Auth required", "Yes", "No"))
            //     .onApprove(triggerLogin)
            //     .onDeny(() => {});
            }
          }  
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
