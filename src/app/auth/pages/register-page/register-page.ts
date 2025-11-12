import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  fb = inject(FormBuilder);
  hasError = signal(false);
  router = inject(Router);
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email = '', password = '', fullName = '' } = this.loginForm.value;
    this.authService.createUser(email!, password!, fullName!).subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }

}
