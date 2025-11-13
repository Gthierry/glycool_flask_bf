import { Component, inject, Input } from '@angular/core';
import { User } from '../../../../../core/models/user-models/user.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../../../../core/services/user-services/user-service';
import { TokenService } from '../../../../../core/services/token-service/token-service';
import { Router } from '@angular/router';
import { UserProfilComponent } from '../../user-profil-component';
import { AuthService } from '../../../../../core/services/authentification/auth-service';
@Component({
  selector: 'infos-profil',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './infos-profil-component.html',
  styleUrl: './infos-profil-component.css',
})
export class InfosProfilComponent {
  //user utiliser pour afficher les infos de l'utilisateur connecté
  user: User | undefined;
  //recupération du user directement du parent via signal
  parent = inject(AuthService)
  userSignal = this.parent.userSignal
  

  //formulaire de modification des infos du profil
  formBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    //recupération des données de l'utilisateur connecté depuis le local storage
    const userData = this.userSignal;
    if (userData) {
      this.user = userData
      console.log('from const: ' + this.user?.user_id);
    }
    //creation du formulaire avec les valeurs initiales de l'utilisateur connecté
    this.form = this.formBuilder.group({
      bio: [this.user?.bio || '', Validators.maxLength(500)],
      first_name: [this.user?.first_name || ''],
      last_name: [this.user?.last_name || ''],
      email: [this.user?.email || '', [Validators.email, Validators.required]],
      username: [this.user?.username || '', Validators.required],
      city: [this.user?.city || ''],
      birthdate: [this.user?.birthdate || ''],
    });
  }

  returnButtonClick() {
    window.history.back();
  }


  //injection du service utilisateur
  userService = inject(UserService);
  tokenService = inject(TokenService);
  route = inject(Router);
  //fonction pour sauvegarder les modifications du profil
  saveProfile() {
    console.log('User ID to update: ' + this.user?.user_id);
    //vérification de la validité du token
    if (!this.tokenService.isTokenExpired() && this.tokenService.getToken()) {
      //verification de la validité du formulaire et d'une id utilisateur
      if (this.form.valid && this.user?.user_id) {
        //creation de l'objet utilisateur mis à jour avec les nouvelles valeurs du formulaire
        const updatedUser = {
          user_id: this.user.user_id,
          first_name: this.form.value.first_name,
          last_name: this.form.value.last_name,
          email: this.form.value.email,
          username: this.form.value.username,
          avatar: this.form.value.avatar ? this.form.value.avatar : "default.png",
          bio: this.form.value.bio,
          city: this.form.value.city,
          birthdate: this.form.value.birthdate,
          role: this.user.role,
          isActive: this.user.isActive,
        };
        console.log(
          'just before the subscribe...........................................................',
        );
        //appel du service utilisateur pour mettre à jour les informations dans le backend
        const userUpdated = this.userService.updateUser(updatedUser).subscribe({
          next: (reponse) => {
            this.user = reponse;
            this.userSignal.update(() => this.user ?? null);
            // Redirection vers la page de profil
            this.route.navigate(['/profil/informations']);
          },
          error: (error) => {
            console.error('Error updating user:', error);
          },
        });
      }
    }
  }
}
