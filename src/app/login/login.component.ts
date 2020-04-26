import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FormControl, Validators } from '@angular/forms';
import {
  hasKey,
  setString,
  getString,
} from 'tns-core-modules/application-settings';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly nameControl = new FormControl('', Validators.required);
  private readonly USER_NAME_KEY = 'username';

  constructor(private readonly page: Page) {
    this.page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.checkIfIsLoggedIn();
  }

  public submit(): void {
    const username = this.nameControl.value;
    setString(this.USER_NAME_KEY, username);
    // send request to BE
  }

  private checkIfIsLoggedIn(): void {
    if (hasKey(this.USER_NAME_KEY)) {
      const username = getString(this.USER_NAME_KEY);
      console.log(username);
    }
  }
}
