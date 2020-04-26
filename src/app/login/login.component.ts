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
import { isAndroid } from 'tns-core-modules/platform';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly nameControl = new FormControl('', Validators.required);
  private readonly USER_NAME_KEY = 'username';
  private pushToken: string;

  constructor(page: Page, private readonly router: RouterExtensions) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.getFirebasePushToken();
    this.checkIfIsLoggedIn();
  }

  public submit(): void {
    const username: string = this.nameControl.value;
    setString(this.USER_NAME_KEY, username);
    this.sendUserData(username);
  }

  private checkIfIsLoggedIn(): void {
    if (hasKey(this.USER_NAME_KEY)) {
      const username = getString(this.USER_NAME_KEY);
      this.sendUserData(username);
      this.router.navigate(['/beacon'], { queryParams: { username } });
    }
  }

  private sendUserData(username: string): void {
    if (!isAndroid) {
      return;
    }
    const macAddress = this.getMacAddress();
    console.log(macAddress);
  }

  private getFirebasePushToken(): void {
    firebase.addOnPushTokenReceivedCallback((token) => {
      this.pushToken = token;
      // eslint-disable-next-line no-console
      console.log(token);
    });
  }

  private getMacAddress(): string {
    return '';
  }
}
