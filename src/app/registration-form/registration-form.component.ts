import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FieldValidityStyle, State, UserData } from './registration-form.model';
import { RegistrationFormService } from './registration-form.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  defaultRegisteredUserData: UserData = {
    firstName: '',
    lastName: '',
    email: ''
  };
  registeredUserData: UserData;
  state: State = {
    isRegistering: false,
    isUserRegistered: false,
    isRegistrationError: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private registrationFormService: RegistrationFormService
  ) {
    this.registeredUserData = this.defaultRegisteredUserData;
    this.registrationForm = this.getComposedFormGroup();
  }

  onSubmit(): void {
    if (!this.registrationForm.valid) {
      return;
    }

    this.state.isRegistering = true;
    const userData: UserData = {
      firstName: this.registrationForm.controls.firstName.value as string,
      lastName: this.registrationForm.controls.lastName.value as string,
      email: this.registrationForm.controls.email.value as string
    };

    this.registrationFormService.registerUser(userData)
      .subscribe(
        () => {
          this.state.isUserRegistered = true;
          this.state.isRegistering = false;
          this.state.isRegistrationError = false;
          this.registeredUserData = userData;
        },
        () => {
          this.state.isRegistrationError = true;
          this.state.isRegistering = false;
          this.state.isUserRegistered = false;
        }
      );
  }

  getFormComponentStyle(fieldName: string): FieldValidityStyle {
    return this.registrationFormService.getValidationStateStyle(this.registrationForm.get(fieldName));
  }

  resetForm(): void {
    this.registeredUserData = this.defaultRegisteredUserData;
    this.state.isRegistering = false;
    this.state.isUserRegistered = false;
    this.state.isRegistrationError = false;
    this.registrationForm.reset();
  }



  private getComposedFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        RxwebValidators.email()
      ]],
      confirmEmail: ['', [
        Validators.required,
        RxwebValidators.email(),
        RxwebValidators.compare({fieldName: 'email'})
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        RxwebValidators.password({
          validation: {
            upperCase: true,
            lowerCase: true,
          }
        }),
        this.registrationFormService.passwordContainsName()
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        RxwebValidators.password({
          validation: {
            upperCase: true,
            lowerCase: true,
          }
        }),
        this.registrationFormService.passwordContainsName(),
        RxwebValidators.compare({fieldName: 'password'})
      ]],
    });
  }
}
