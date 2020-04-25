import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import * as firebase from 'nativescript-plugin-firebase';
import { Message } from 'nativescript-plugin-firebase';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private readonly page: Page) {
    this.page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    firebase
      .init({
        onMessageReceivedCallback: (message: Message) => {
          // eslint-disable-next-line no-console
          console.log(`Title: ${message.title}`);
          // eslint-disable-next-line no-console
          console.log(`Body: ${message.body}`);
        },
        onPushTokenReceivedCallback(token) {
          // eslint-disable-next-line no-console
          console.log('Firebase push token: ' + token);
        },
      })
      .then(
        () => {
          // eslint-disable-next-line no-console
          console.log('firebase.init done');
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.log('firebase.init error: ' + error);
        }
      );
  }
}
