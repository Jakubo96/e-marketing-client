import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'nativescript-plugin-firebase';
import { Message } from 'nativescript-plugin-firebase';
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { remove } from 'tns-core-modules/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.scss'],
})
export class BeaconComponent implements OnInit {
  public username: string;

  private readonly USER_NAME_KEY = 'username';
  private readonly MAC_ADDRESS_KEY = 'macAddress';

  constructor(
    page: Page,
    private readonly route: ActivatedRoute,
    private readonly router: RouterExtensions
  ) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.retrieveUsername();
    this.setupFirebaseCallbacks();
  }

  public logout(): void {
    remove(this.USER_NAME_KEY);
    remove(this.MAC_ADDRESS_KEY);
    // TODO call BE
    this.router.back();
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
