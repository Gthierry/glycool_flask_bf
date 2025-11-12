import { Routes } from '@angular/router';
import { HomeComponent } from '../components/pages/home-component/home-component';
import { UserRegistrationComponent } from '../components/pages/user-registration-component/user-registration-component';
import { UserLoginComponent } from '../components/pages/user-login-component/user-login-component';
import { UserProfilComponent } from '../components/pages/user-profil-component/user-profil-component';
import { ForumComponent } from '../components/pages/forum-component/forum-component';
import { loggedGuard } from '../core/guard/logged-guard';
import { InfosProfilComponent } from '../components/pages/infos-profil-component/infos-profil-component';
import { MessageInbox } from '../components/pages/message-inbox/message-inbox';
import { WhatSDiabetComponent } from '../components/pages/what-s-diabet-component/what-s-diabet-component';
import { EncouragementsComponent } from '../components/pages/encouragements-component/encouragements-component';
import { IGComponent } from '../components/pages/ig-component/ig-component';
import { AlimentationComponent } from '../components/pages/alimentation-component/alimentation-component';
import { HealthyFoodComponent } from '../components/pages/healthy-food-component/healthy-food-component';
import { AvoidFoodComponent } from '../components/pages/avoid-food-component/avoid-food-component';
import { WhatsDiabetRestaurantComponent } from '../components/pages/whats-diabet-restaurant-component/whats-diabet-restaurant-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'what-s-diabet', component: WhatSDiabetComponent },
  { path: 'encouragements', component: EncouragementsComponent },
  { path: 'ig', component: IGComponent },
  { path: 'alimentation', component: AlimentationComponent },
  { path: 'healthy-food', component: HealthyFoodComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'avoid-food', component: AvoidFoodComponent },
  { path: 'whats-diabet-restaurant', component: WhatsDiabetRestaurantComponent },
  { path: 'profil', component: UserProfilComponent, canActivate: [loggedGuard] },
  { path: 'message-inbox', component: MessageInbox },
  { path: 'forum', component: ForumComponent },
  { path: 'infos-profil', component: InfosProfilComponent, canActivate: [loggedGuard] },
];
