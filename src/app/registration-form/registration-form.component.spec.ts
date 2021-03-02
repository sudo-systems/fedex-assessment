import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationFormComponent } from './registration-form.component';
import { FieldValidityStyle } from './registration-form.model';
import { RegistrationFormService } from './registration-form.service';
import { RegistrationMessageComponent } from './registration-message/registration-message.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        RegistrationFormComponent,
        RegistrationMessageComponent
      ],
      providers: [
        RegistrationFormService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.registeredUserData).toEqual(component.defaultRegisteredUserData);
    expect(component.registrationForm).toBeDefined();
  });

  describe('onSubmit', () => {
    it('should not start registering if the form is not valid', () => {
      component.registrationForm.setErrors({incorrect: true});
      component.state.isRegistering = false;

      component.onSubmit();

      expect(component.state.isRegistering).toBeFalsy();
    });
  });

  describe('getFormComponentStyle', () => {
    it('should return the appropriate object', () => {
      const expectedResult: FieldValidityStyle = {
        'is-valid': false,
        'is-invalid': false
      };

      const result: FieldValidityStyle = component.getFormComponentStyle('firstName');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('resetForm', () => {
    it('should reset all component variables to their default state', () => {
      component.registeredUserData = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'some@email.com'
      };
      component.state.isRegistering = true;
      component.state.isUserRegistered = true;
      component.state.isRegistrationError = true;
      spyOn(component.registrationForm, 'reset');

      component.resetForm();

      expect(component.registeredUserData).toEqual({
        firstName: '',
        lastName: '',
        email: ''
      });
      expect(component.state.isRegistering).toBeFalsy();
      expect(component.state.isUserRegistered).toBeFalsy();
      expect(component.state.isRegistrationError).toBeFalsy();
      expect(component.registrationForm.reset).toHaveBeenCalledTimes(1);
    });
  });
});
