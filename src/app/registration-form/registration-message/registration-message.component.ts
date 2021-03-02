import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserData } from '../registration-form.model';

@Component({
  selector: 'app-registration-message',
  templateUrl: './registration-message.component.html'
})
export class RegistrationMessageComponent {
  @Input() userData: UserData = {
    firstName: '',
    lastName: '',
    email: ''
  };
  @Input() isRegistrationError = false;
  @Input() isUserRegistered = false;

  @Output() tryAgain: EventEmitter<any> = new EventEmitter();
}
