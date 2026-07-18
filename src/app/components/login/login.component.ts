import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginId = '';
  password = '';
  captchaInput = '';
  showPassword = false;
  captchaValue = '';
  captchaError = false;
  loginError = '';
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captchaValue = result;
    this.captchaInput = '';
    this.captchaError = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    this.loginError = '';
    this.captchaError = false;

    if (!this.loginId || !this.password || !this.captchaInput) {
      this.loginError = 'All fields marked with * are mandatory.';
      return;
    }

    if (this.captchaInput !== this.captchaValue) {
      this.captchaError = true;
      this.loginError = 'Incorrect CAPTCHA. Please try again.';
      this.generateCaptcha();
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      // Demo: admin/admin123 credentials
      if (this.loginId === 'admin' && this.password === 'admin123') {
        this.authService.login('Admin');
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = 'Invalid Login ID or Password. Please try again.';
        this.generateCaptcha();
      }
    }, 1200);
  }

  onCancel(): void {
    this.loginId = '';
    this.password = '';
    this.captchaInput = '';
    this.loginError = '';
    this.captchaError = false;
    this.generateCaptcha();
  }

  onForgotPassword(): void {
    alert('Please contact the administrator to reset your password.');
  }
}
