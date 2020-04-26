import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginRoutingModule } from 'app/login/login-routing.module';
import { LoginComponent } from 'app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
  ],
  declarations: [LoginComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
