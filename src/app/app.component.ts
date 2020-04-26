import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    firebase.init({}).then(
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
