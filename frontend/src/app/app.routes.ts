import { Routes } from '@angular/router';
import { HomeComponent } from '../components/pages/home-component/home-component';
import { UserRegistrationComponent } from '../components/pages/user-registration-component/user-registration-component';
import { UserLoginComponent } from '../components/pages/user-login-component/user-login-component';
import { UserProfilComponent } from '../components/pages/user-profil-component/user-profil-component';
import { ForumComponent } from '../components/pages/forum-component/forum-component';
import { loggedGuard } from '../core/guard/logged-guard';
import { InfosProfilComponent } from '../components/pages/user-profil-component/user-profil-children/infos-profil-component/infos-profil-component';
import { WhatSDiabetComponent } from '../components/pages/what-s-diabet-component/what-s-diabet-component';
import { EncouragementsComponent } from '../components/pages/encouragements-component/encouragements-component';
import { IGComponent } from '../components/pages/ig-component/ig-component';
import { AlimentationComponent } from '../components/pages/alimentation-component/alimentation-component';
import { HealthyFoodComponent } from '../components/pages/healthy-food-component/healthy-food-component';
import { AvoidFoodComponent } from '../components/pages/avoid-food-component/avoid-food-component';
import { WhatsDiabetRestaurantComponent } from '../components/pages/whats-diabet-restaurant-component/whats-diabet-restaurant-component';
import { ContactsComponent } from '../components/pages/user-profil-component/user-profil-children/contacts-component/contacts-component';
import { UserInformationsComponent } from '../components/pages/user-profil-component/user-profil-children/user-informations-component/user-informations-component';
import { MessagesComponent } from '../components/pages/user-profil-component/user-profil-children/messages-component/messages-component';
import { SendMessageComponent } from '../components/pages/user-profil-component/user-profil-children/send-message-component/send-message-component';
import { messageResolverResolver } from '../core/resolver/message-resolver/message-resolver-resolver';
import { ReadMessageComponent } from '../components/pages/user-profil-component/user-profil-children/read-message-component/read-message-component';
import { ContactInformations } from '../components/pages/user-profil-component/user-profil-children/contact-informations/contact-informations';
import { inOutMessageboxResolver } from '../core/resolver/in-out-messagebox-resolver/in-out-messagebox-resolver';

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

  {
    path: 'profil',
    component: UserProfilComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'informations', pathMatch: 'full' },
      { path: 'informations', component: UserInformationsComponent, pathMatch: 'full' },
      { path: 'infos-profil', component: InfosProfilComponent },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: { messages: messageResolverResolver },
      },
      { path: 'contacts', component: ContactsComponent },
      {
        path: 'contactinformations',
        component: ContactInformations,
        resolve: { listes: inOutMessageboxResolver },
      },

      //TODO
      // {
      //   path: 'readmessage',
      //   component: ReadMessageComponent,
      //   resolve: { messages: messageResolverResolver },
      // },
    ],
  },
  { path: 'forum', component: ForumComponent },
];
