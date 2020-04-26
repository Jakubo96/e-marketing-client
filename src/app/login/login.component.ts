import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FormControl, Validators } from '@angular/forms';
import {
  hasKey,
  setString,
  getString,
} from 'tns-core-modules/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly nameControl = new FormControl('', Validators.required);
  private readonly USER_NAME_KEY = 'username';

  constructor(page: Page, private readonly router: RouterExtensions) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
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
      this.router.navigate(['/beacon'], { queryParams: { username } });
    }
  }

  private sendUserData(username: string) {}
}
