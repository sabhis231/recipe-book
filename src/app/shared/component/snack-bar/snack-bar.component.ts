import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit, OnDestroy {
  @Input('message') message: string;
  @Input('isError') isError: boolean;
  @Input('url-data') url: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  sub: Subscription;

  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.sub = this._snackBar
      .open(this.message, 'Close', {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: this.isError ? 'notif-error' : 'notif-success',
      })
      .afterDismissed()
      .subscribe(() => {
        if (this.url) this.router.navigate([this.url]);
      });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
