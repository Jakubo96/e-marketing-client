import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.scss'],
})
export class BeaconComponent implements OnInit {
  private readonly USER_NAME_KEY = 'username';
  public username: string;

  constructor(page: Page, private readonly route: ActivatedRoute) {
    page.actionBarHidden = true;
  }
  public ngOnInit(): void {
    this.retrieveUsername();
  }

  private retrieveUsername(): void {
    this.username = this.route.snapshot.queryParams.username;
  }
}
