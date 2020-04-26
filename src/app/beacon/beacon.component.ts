import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'nativescript-plugin-firebase';
import { Message } from 'nativescript-plugin-firebase';
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { remove } from 'tns-core-modules/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { HttpWrapperService } from 'app/http-wrapper.service';

@AutoUnsubscribe()
@Component({
  selector: 'ns-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.scss'],
})
export class BeaconComponent implements OnInit, OnDestroy {
  private readonly USER_NAME_KEY = 'username';
  private readonly MAC_ADDRESS_KEY = 'macAddress';

  public username: string;
  private mac: string;

  constructor(
    page: Page,
    private readonly route: ActivatedRoute,
    private readonly router: RouterExtensions,
    private readonly httpWrapper: HttpWrapperService
  ) {
    page.actionBarHidden = true;
  }

  public ngOnInit(): void {
    this.retrieveUsernameAndMac();
    this.setupFirebaseCallbacks();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public ngOnDestroy(): void {}

  public logout(): void {
    remove(this.USER_NAME_KEY);
    remove(this.MAC_ADDRESS_KEY);

    this.httpWrapper.logout(this.mac).subscribe(() => this.router.back());
  }

  private retrieveUsernameAndMac(): void {
    this.username = this.route.snapshot.queryParams.username;
    this.mac = this.route.snapshot.queryParams.mac;
  }

  private setupFirebaseCallbacks(): void {
    firebase.addOnMessageReceivedCallback((message: Message) => {
      if (message.foreground) {
        TNSFancyAlert.showInfo(message.title, message.body);
      }
    });
  }
}
