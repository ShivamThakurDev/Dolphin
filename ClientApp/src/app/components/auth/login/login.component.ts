import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/task-list';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin@dolphin.local', [Validators.required, Validators.email]],
      password: ['Admin@12345', Validators.required],
      tenant: ['demo', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/task-list';
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const { email, password, tenant } = this.loginForm.value;

    this.authService.login(email, password, tenant).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.errors?.[0]?.message || 'Invalid credentials or tenant. Please check your inputs.';
      }
    });
  }

  onQuickDemoLogin(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.autoLoginDemo().subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.errorMessage = 'Could not connect to the demo backend. Is the API server running on port 5154?';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Connection failed. Please ensure Dolphin API is running.';
      }
    });
  }
}
