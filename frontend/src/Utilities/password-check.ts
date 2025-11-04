//import pour créer mes validators
import { Injectable } from '@angular/core';
import {
    FormGroup,
    AbstractControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export  class passwordCheck {

        // Custom validator to check if passwords match
    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        if (password !== confirmPassword) {
            return { passwordMismatch: true };
        }
        return null;
    }

    // Custom validator to check if the password contains at least one uppercase letter
    hasUppercase(control: AbstractControl) {
        const value = control.value;
        if (value && !/[A-Z]/.test(value)) {
            return { uppercase: true };
        }
        return null;
    }

    // Custom validator to check if the password contains at least one number
    hasNumber(control: AbstractControl) {
        const value = control.value;
        if (value && !/\d/.test(value)) {
            return { number: true };
        }
        return null;
    }

    // Custom validator to check if the password contains at least one special character
    hasSpecialCharacter(control: AbstractControl) {
        const value = control.value;
        if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return { specialCharacter: true };
        }
        return null;
    }

   

   



}