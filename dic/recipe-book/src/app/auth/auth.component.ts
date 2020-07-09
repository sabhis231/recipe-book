import { AuthSandbox } from './sandbox/auth.sandbox.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  isLoading: boolean = false;
  error: string;

  constructor(
    private authService: AuthService,
    private authSandbox: AuthSandbox
  ) {}

  ngOnInit(): void {
    this.authSandbox.getLoading().subscribe((loadingData) => {
      this.isLoading = loadingData;
    });

    this.authSandbox.getError().subscribe((errorData) => {
      this.error = errorData;
    });
  }

  onSubmit(loginForm: NgForm) {
    this.authService.onLogin(loginForm.value.email, loginForm.value.password);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
