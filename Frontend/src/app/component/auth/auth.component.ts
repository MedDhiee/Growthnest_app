import { Component } from '@angular/core';
import { 
  trigger, 
  transition, 
  style, 
  animate,
  state
} from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('formAnimation', [
      state('login', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('register', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('login <=> register', [
        style({
          opacity: 0,
          transform: 'translateX(20px)'
        }),
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class AuthComponent {
  isLogin = true;

  switchToRegister() {
    this.isLogin = false;
  }

  switchToLogin() {
    this.isLogin = true;
  }
}