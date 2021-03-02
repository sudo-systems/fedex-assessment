import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldValidityStyle, UserData, ValidationResult } from './registration-form.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {
  private readonly backendUri = 'https://demo-api.now.sh/users';

  constructor(private httpClient: HttpClient) {
  }

  registerUser(userData: UserData): Observable<null> {
    return this.httpClient.post<null>(this.backendUri, userData);
  }

  getValidationStateStyle(formControl: AbstractControl | null): FieldValidityStyle {
    const result: FieldValidityStyle = {
      'is-valid': false,
      'is-invalid': false
    };

    if (formControl && formControl.touched) {
      result['is-valid'] = formControl.valid;
      result['is-invalid'] = formControl.invalid;
    }

    return result;
  }

  passwordContainsName(): ValidatorFn {
    return (formControl: AbstractControl) => {
      let result: ValidationResult | null = null;
      const firstName: string = formControl.parent?.get('firstName')?.value as string;
      const lastName: string = formControl.parent?.get('lastName')?.value as string;
      const password: string = formControl.value as string;
      const lowercasePassword: string = password.toLowerCase();
      let containsFirstName = false;
      let containsLastName = false;

      if (firstName) {
        const firstNameParts: string[] = firstName.split(' ');
        const firstNamePartsUsed: string[] = firstNameParts.filter((firstNameEntry: string) => (lowercasePassword.indexOf(firstNameEntry) > -1));
        containsFirstName = (firstNamePartsUsed.length > 0);
      }

      if (lastName) {
        const lastNameParts: string[] = lastName.split(' ');
        const lastNamePartsUsed: string[] = lastNameParts.filter((lastNameEntry: string) => (lowercasePassword.indexOf(lastNameEntry) > -1));
        containsLastName = (lastNamePartsUsed.length > 0);
      }

      if (containsFirstName || containsLastName) {
        result = {containsName: true};
      }

      return result;
    };
  }
}
