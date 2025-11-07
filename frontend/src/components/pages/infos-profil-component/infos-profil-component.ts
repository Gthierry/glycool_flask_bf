import { Component, inject } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../../core/services/user-services/user-service';
import { TokenService } from '../../../core/services/token-service/token-service';
import { Router } from '@angular/router';
@Component({
  selector: 'infos-profil',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './infos-profil-component.html',
  styleUrl: './infos-profil-component.css',
})
export class InfosProfilComponent {
  //user utiliser pour afficher les infos de l'utilisateur connecté
  user: User | undefined;

  //formulaire de modification des infos du profil
  formBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    //recupération des données de l'utilisateur connecté depuis le local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('from const: ' + this.user?.id);
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

  //fonction pour revenir à la page précédente
  returnButtonsClick() {
    window.history.back();
  }

  //injection du service utilisateur
  userService = inject(UserService);
  tokenService = inject(TokenService);
  route = inject(Router);
  saveProfile() {
    console.log('User ID to update: ' + this.user?.id);
    //vérification de la validité du token
    if (!this.tokenService.isTokenExpired() && this.tokenService.getToken()) {
      //verification de la validité du formulaire et d'une id utilisateur
      if (this.form.valid && this.user?.id) {
        //creation de l'objet utilisateur mis à jour avec les nouvelles valeurs du formulaire
        const updatedUser = {
          user_id: this.user.id,
          first_name: this.form.value.first_name,
          last_name: this.form.value.last_name,
          email: this.form.value.email,
          username: this.form.value.username,
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
            //mise à jour des informations utilisateur dans le local storage
            localStorage.setItem('user', JSON.stringify(this.user) || '');
            console.log(
              'User updated successfully:................................................',
              reponse,
            );
            // Redirection vers la page de profil
            this.route.navigate(['/profil']);
          },
          error: (error) => {
            console.error('Error updating user:', error);
          },
        });
      }
    }
  }
}
