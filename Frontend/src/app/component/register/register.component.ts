import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['USER', 'ADMIN', 'BuisnessOwner', 'MarketingAgent'];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.successMessage = "Registration successful!";
        this.errorMessage = '';
        this.registerForm.reset();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? "Registration failed.";
        this.successMessage = '';
      }
    });
  }
  @Output() switchToLogin = new EventEmitter<void>();

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }
  
  // closeAlert(type: 'success' | 'error') {
  //   if (type === 'success') {
  //     this.successMessage = '';
  //   } else {
  //     this.errorMessage = '';
  //   }
  // }
}