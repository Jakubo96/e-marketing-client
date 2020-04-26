import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FormControl, Validators } from '@angular/forms';
import {
  getString,
  hasKey,
  setString,
} from 'tns-core-modules/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
import * as firebase from 'nativescript-plugin-firebase';
import { DeviceIdentifier } from 'app/login/device-identifier';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { HttpWrapperService } from 'app/http-wrapper.service';

@AutoUnsubscribe()
@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly nameControl = new FormControl('', Validators.required);
  private readonly macControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2}):([0-9A-F]{2})$/
    ),
  ]);
  private readonly USER_NAME_KEY = 'username';

  private readonly MAC_ADDRESS_KEY = 'macAddress';
  private pushToken: string;

  private username: string;
  private macAddress: string;

  constructor(
    page: Page,
    private readonly router: RouterExtensions,
    private readonly httpWrapper: HttpWrapperService
  ) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.navigateIfIsLoggedIn();
    this.getFirebasePushToken();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public ngOnDestroy(): void {}

  public submit(): void {
    this.username = this.nameControl.value;
    this.macAddress = this.macControl.value;

    setString(this.USER_NAME_KEY, this.username);
    setString(this.MAC_ADDRESS_KEY, this.macAddress);

    this.sendUserData();

    this.router.navigate(['/beacon'], {
      queryParams: { username: this.username, mac: this.macAddress },
    });
  }

  private navigateIfIsLoggedIn(): void {
    if (this.isLoggedIn) {
      this.username = getString(this.USER_NAME_KEY);
      this.macAddress = getString(this.MAC_ADDRESS_KEY);

      this.router.navigate(['/beacon'], {
        queryParams: { username: this.username, mac: this.macAddress },
      });
    }
  }

  private get isLoggedIn(): boolean {
    return hasKey(this.USER_NAME_KEY) && hasKey(this.MAC_ADDRESS_KEY);
  }

  private sendUserData(): void {
    if (!this.isLoggedIn) {
      return;
    }

    const deviceIdentifier: DeviceIdentifier = {
      username: this.username,
      mac: this.macAddress,
      pushToken: this.pushToken,
    };

    this.httpWrapper.login(deviceIdentifier).subscribe();
  }

  private getFirebasePushToken(): void {
    firebase.addOnPushTokenReceivedCallback((token) => {
      this.pushToken = token;
      this.sendUserData();
    });
  }
}
