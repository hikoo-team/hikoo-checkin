import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { AppService, AccountDto, AuthMeResponse } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('authInstance') authInstance: ElementRef;

  email = 'tonylin@gmail.com';
  user: AccountDto | null = null;
  imageLoaded = false;

  constructor(
    private app: AppService,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {
  }

  ngOnInit(): void {
  }

  onSearchClick() {
    console.log(this.email);
    this.app.getUser(this.email).subscribe((user) => {
      this.user = user;
    }, console.log);
  }

  onImageLoad() {
    console.log('onImageLoad');
    this.imageLoaded = true;
    // tslint:disable-next-line:no-string-literal
    window['AuthMe'].init(document.getElementById('instance'), {
      apiKey: 'YS24CanRwxaynfKwKh59agQAreyMXcPR',
      refPhoto: 'photo',
      callback: this.onValidationFinsihed.bind(this)
    });
  }

  onValidationFinsihed(r: AuthMeResponse) {
    this.zone.run(() => {
      if (!r.success) {
        const { code, message } = r.error;
        this.showFailed(`Authentication failed with code ${code} - ${message}`);
        return;
      }

      const { isLiveness, samePersion } = r.result;

      if (!isLiveness) {
        this.showFailed(`Authentication failed - not a real person`);
        return;
      }

      // if (!samePersion) {
      //   this.showFailed(`Authentication failed - not the same person`);
      //   return;
      // }

      this.showFailed(`Authentication success, checking in`);
    });
  }

  onRetryClick() {
    window.location.reload();
  }

  showFailed(message: string) {
    this.snackBar.open(message, 'Retry', { duration: 2000 }).onAction().subscribe(() => {
      this.onRetryClick();
    });
  }
}
