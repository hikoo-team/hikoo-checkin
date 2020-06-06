import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { AppService, AccountDto, AuthMeResponse, PermitInfoDto, CheckinDto, UpdateHikeDto } from './app.service';
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

  onCheckIn() {
    this.app.getUser(this.email).subscribe((user) => {
      this.app.getHike(user.id).subscribe((hikeInfo) => {
        const updateHike = new UpdateHikeDto(hikeInfo.id, "ACCEPTED", new Date().getTime())
        this.app.updateHikeStatus(updateHike).subscribe((result) => {
          console.log(`update permit, hikeId = `, updateHike.hikeId)
          const checkin = new CheckinDto(user.id, hikeInfo.id, user.fcmToken);
          this.app.checkin(checkin).subscribe((result) => {
            console.log(`checkin result = `, result.success);
          });
        });
      }); 
    });
  }

  onAddPermit() {
    console.log(`add permit info`);
    const startTime = new Date().getTime();
    const endTime = new Date().getTime() + 28800000;
    this.app.getUser(this.email).subscribe((user) => {
      console.log(`add permit from =` + user.id );
      const permitInfo = new PermitInfoDto(
        Number(user.id),
        startTime, 
        endTime,
        1,
        "GuideName",
        "GuideContact",
        "GuideContact2",
        "PENDING",
        startTime,
        "This is testing",
        false,
        false,
        false
      );
      this.app.addPermit(permitInfo).subscribe((result) => {
        console.log(`Insert permit data , result = `, result)
      });
    })
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
