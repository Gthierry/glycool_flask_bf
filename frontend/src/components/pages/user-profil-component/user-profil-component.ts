import { Component, inject, signal, OnInit } from '@angular/core';
import { User } from '../../../core/models/user-models/user.model';
import { TokenService } from '../../../core/services/token-service/token-service';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/authentification/auth-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'user-profil-component',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-profil-component.html',
  styleUrls: ['./user-profil-component.css'],
})
export class UserProfilComponent {
  //signal injection for user data
  userSignal = inject(AuthService);
  //local user data
  user: User | null = null;
  //route injection
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  //token service injection
  tokenService = inject(TokenService);

  constructor() {
    console.log('passage par constructeur userprofil');
    //check if token is valid
    if (this.tokenService.getToken()) {
      //get user data from signal
      this.user = this.userSignal.userSignal();
    } else {
      console.log('No valid token found, redirecting to register.');
      this.route.navigate(['register']);
    }
  }
  // In AuthService or AppComponent
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token && !this.tokenService.isTokenExpired()) {
      const decoded = jwtDecode(token);
      // Restore user/session state here
      this.user = this.userSignal.userSignal();
      console.log('User session restored in UserProfilComponent:', this.user);
    } else {
      // Clear sessio console.log('No valid token found, redirecting to register.');
      this.route.navigate(['register']);
    }
  }

  //Click on the button charger depuis le pc
  loadImage(image: HTMLInputElement): void {
    console.log('Load an image');
    //on click of the button, trigger on the input click onFilesSelected($event)
    image.click();
  }

  //list the type filelist
  selectedFiles: File | null = null;
  //event on the input to select file
  onFilesSelected(event: Event): void {
    //cible l'élément html input
    const input = event.target as HTMLInputElement;

    //si file selectionnée
    if (!input.files || input.files.length == 0) {
      //pas de file, on stoppe
      return;
    }
    //sinon on place le fichier selectionner
    else if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files[0];
    }

    if (this.selectedFiles) {
      if (this.user) {
        this.user.avatar = `profile\\${this.selectedFiles.name}`;
      }
    }
  }

  //copier un fichier
  fileCopy(file: File): void {}
}
