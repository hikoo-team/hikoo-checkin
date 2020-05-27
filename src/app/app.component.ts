import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AppService, AccountDto } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('authInstance') authInstance: ElementRef;

  email = '';
  user: AccountDto | null = null;
  imageLoaded = false;

  constructor(
    private app: AppService
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

  onValidationFinsihed(r) {
    console.log(r);
  }
}
