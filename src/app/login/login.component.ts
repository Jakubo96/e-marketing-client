import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

  constructor(
    page: Page,
    private readonly router: RouterExtensions,
    private readonly fb: FormBuilder
  ) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.getFirebasePushToken();
    this.checkIfIsLoggedIn();
  }

  public submit(): void {
    const username: string = this.nameControl.value;
    const macAddress: string = this.macControl.value;

    setString(this.USER_NAME_KEY, username);
    setString(this.MAC_ADDRESS_KEY, macAddress);

    this.sendUserData(username, macAddress);
  }

  private checkIfIsLoggedIn(): void {
    if (hasKey(this.USER_NAME_KEY) && hasKey(this.MAC_ADDRESS_KEY)) {
      const username: string = getString(this.USER_NAME_KEY);
      const macAddress: string = getString(this.MAC_ADDRESS_KEY);

      this.sendUserData(username, macAddress);
      this.router.navigate(['/beacon'], { queryParams: { username } });
    }
  }

  private sendUserData(username: string, macAddress: string): void {
    const deviceIdentifier: DeviceIdentifier = {
      username,
      macAddress,
      pushToken: this.pushToken,
    };
    console.log(deviceIdentifier);
  }

  private getFirebasePushToken(): void {
    firebase.addOnPushTokenReceivedCallback((token) => {
      this.pushToken = token;
      // eslint-disable-next-line no-console
      console.log(token);
    });
  }
}
