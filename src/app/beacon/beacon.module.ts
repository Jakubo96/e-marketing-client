import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { BeaconComponent } from 'app/beacon/beacon.component';
import { BeaconRoutingModule } from 'app/beacon/beacon-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, BeaconRoutingModule],
  declarations: [BeaconComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BeaconModule {}
