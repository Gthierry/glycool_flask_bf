import { Component, inject } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'infos-profil',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './infos-profil-component.html',
  styleUrl: './infos-profil-component.css',
})
export class InfosProfilComponent {
  //user utiliser pour afficher les infos de l'utilisateur connecté
  user: User | undefined;

  //
  formBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    //recupération des données de l'utilisateur connecté depuis le local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
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

  //fonction pour sauvegarder les modifications du profil
  saveProfile() {
    if (this.form.valid) {
      const updatedUser = {
        this.user.,
       
      };
    }
  }
}
