import { Routes } from '@angular/router';
import { HomeComponent } from '../components/pages/home-component/home-component/home-component';
import { UserRegistrationComponent } from '../components/pages/user-registration-component/user-registration-component';
import { UserLoginComponent } from '../components/pages/user-login-component/user-login-component';
import { UserProfilComponent } from '../components/pages/user-profil-component/user-profil-component';
import { ForumComponent } from '../components/pages/forum-component/forum-component';
import { loggedGuard } from '../core/guard/logged-guard';
import { InfosProfilComponent } from '../components/pages/infos-profil-component/infos-profil-component';
import { MessageInbox } from '../components/pages/message-inbox/message-inbox';
import { WhatSDiabetComponent } from '../components/pages/home-component/home-components-children/what-s-diabet-component/what-s-diabet-component/what-s-diabet-component';
import { EncouragementsComponent } from '../components/pages/home-component/home-components-children/encouragements-component/encouragements-component';
import path from 'path';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'what-s-diabet', component: WhatSDiabetComponent },
  { path: 'encouragements', component: EncouragementsComponent },

  {
    path: 'profil',
    component: UserProfilComponent,
    canActivate: [loggedGuard],
    children: [{ path: 'message-inbox', component: MessageInbox }],
  },
  { path: 'forum', component: ForumComponent },
  { path: 'infos-profil', component: InfosProfilComponent, canActivate: [loggedGuard] },
];
