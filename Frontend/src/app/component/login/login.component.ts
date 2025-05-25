import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.successMessage = 'Login successful! Redirecting...';
          setTimeout(() => this.router.navigate(['/dashboard']), 1500);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message ?? 'Login failed. Please check your credentials.';
          this.successMessage = '';
        }
      });
    }
  }

  @Output() switchToRegister = new EventEmitter<void>();

  onSwitchToRegister() {
    this.switchToRegister.emit();
  }

  // closeAlert(type: 'success' | 'error') {
  //   if (type === 'success') {
  //     this.successMessage = '';
  //   } else {
  //     this.errorMessage = '';
  //   }
  // }
}