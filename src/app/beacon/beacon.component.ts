import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'nativescript-plugin-firebase';
import { Message } from 'nativescript-plugin-firebase';
import { TNSFancyAlert } from 'nativescript-fancyalert';

@Component({
  selector: 'ns-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.scss'],
})
export class BeaconComponent implements OnInit {
  public username: string;

  constructor(page: Page, private readonly route: ActivatedRoute) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.retrieveUsername();
    this.setupFirebaseCallbacks();
  }

  private retrieveUsername(): void {
    this.username = this.route.snapshot.queryParams.username;
  }

  private setupFirebaseCallbacks(): void {
    firebase.addOnMessageReceivedCallback((message: Message) =>
      TNSFancyAlert.showInfo(message.title, message.body)
    );
  }
}
