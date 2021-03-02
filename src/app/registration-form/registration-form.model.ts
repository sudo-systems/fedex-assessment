export interface ValidationResult {
  [key: string]: boolean;
}

export interface State {
  [key: string]: boolean;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface FieldValidityStyle {
  'is-valid': boolean;
  'is-invalid': boolean;
}
