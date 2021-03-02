import { AbstractControl, FormControl } from '@angular/forms';

import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistrationFormService } from './registration-form.service';
import { FieldValidityStyle, UserData } from './registration-form.model';

describe('StudentsService', () => {
  let injector: TestBed;
  let service: RegistrationFormService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationFormService],
    });

    injector = getTestBed();
    service = injector.inject(RegistrationFormService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('registerUser', () => {
    const mockUserData: UserData = {
      firstName: '',
      lastName: '',
      email: ''
    };

    it('should call the backend uri with POST and return null', () => {
      service.registerUser(mockUserData).subscribe((result) => {
        expect(result).toEqual(null);
      });

      const req = httpMock.expectOne('https://demo-api.now.sh/users');
      expect(req.request.method).toBe('POST');

      req.flush(null);
    });
  });

  describe('getValidationStateStyle', () => {
    let mockFormControl: AbstractControl;
    const defaultResult: FieldValidityStyle = {
      'is-valid': false,
      'is-invalid': false
    };

    beforeEach(() => {
      mockFormControl = new FormControl('', null);
    });

    it('should return both styles falsely if no FormControl is provided', () => {
      expect(service.getValidationStateStyle(null)).toEqual(defaultResult);
    });

    it('should return both styles falsely if the FormControl is untouched', () => {
      mockFormControl.markAsUntouched();

      expect(service.getValidationStateStyle(mockFormControl)).toEqual(defaultResult);
    });

    it('should return valid class as true if the component has been touched and validation succeeded', () => {
      const expectedResult: FieldValidityStyle = {
        'is-valid': true,
        'is-invalid': false
      };

      mockFormControl.markAsTouched();

      expect(service.getValidationStateStyle(mockFormControl)).toEqual(expectedResult);
    });

    it('should return valid class as false if the component has been touched and validation failed', () => {
      const expectedResult: FieldValidityStyle = {
        'is-valid': false,
        'is-invalid': true
      };

      mockFormControl.markAsTouched();
      mockFormControl.setErrors({incorrect: true});

      expect(service.getValidationStateStyle(mockFormControl)).toEqual(expectedResult);
    });
  });
});
