import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly nameControl = new FormControl('', Validators.required);
  private readonly macControl = new FormControl('', Validators.required);

  private readonly USER_NAME_KEY = 'username';
  private readonly MAC_ADDRESS_KEY = 'macAddress';

  private pushToken: string;
  private username: string;
  private macAddress: string;

  constructor(page: Page, private readonly router: RouterExtensions) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.navigateIfIsLoggedIn();
    this.getFirebasePushToken();
  }

  public submit(): void {
    this.username = this.nameControl.value;
    this.macAddress = this.macControl.value;

    setString(this.USER_NAME_KEY, this.username);
    setString(this.MAC_ADDRESS_KEY, this.macAddress);

    this.sendUserData();
    this.router.navigate(['/beacon'], {
      queryParams: { username: this.username },
    });
  }

  private navigateIfIsLoggedIn(): void {
    if (this.isLoggedIn) {
      this.username = getString(this.USER_NAME_KEY);
      this.macAddress = getString(this.MAC_ADDRESS_KEY);

      this.router.navigate(['/beacon'], {
        queryParams: { username: this.username },
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
      macAddress: this.macAddress,
      pushToken: this.pushToken,
    };
    // eslint-disable-next-line no-console
    console.log(deviceIdentifier);
  }

  private getFirebasePushToken(): void {
    firebase.addOnPushTokenReceivedCallback((token) => {
      this.pushToken = token;
      this.sendUserData();
    });
  }
}
