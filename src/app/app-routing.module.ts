import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () =>
      import('app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'beacon',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () =>
      import('app/beacon/beacon.module').then((m) => m.BeaconModule),
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
