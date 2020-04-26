import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { BeaconComponent } from 'app/beacon/beacon.component';

const routes: Routes = [{ path: '', component: BeaconComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class BeaconRoutingModule {}
