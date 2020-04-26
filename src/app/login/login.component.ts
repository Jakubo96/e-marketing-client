import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly nameControl = new FormControl('', Validators.required);

  constructor(private readonly page: Page) {
    this.page.actionBarHidden = true;
  }
}
