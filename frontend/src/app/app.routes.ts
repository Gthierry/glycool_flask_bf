import { Routes } from '@angular/router';
import { HomeComponent } from '../components/pages/home-component/home-component/home-component';
import { UserRegistrationComponent } from '../components/pages/user-registration-component/user-registration-component';
import { UserLoginComponent } from '../components/pages/user-login-component/user-login-component';
import { UserProfilComponent } from '../components/pages/user-profil-component/user-profil-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'user-profile-component', component: UserProfilComponent },
];
