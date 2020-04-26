import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeviceIdentifier } from 'app/login/device-identifier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpWrapperService {
  private readonly SERVER_PREFIX = 'http://192.168.1.21:8080/bluetooth/device/';
  private readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly http: HttpClient) {}

  public login(device: DeviceIdentifier): Observable<void> {
    return this.http.post<void>(
      `${this.SERVER_PREFIX}login`,
      device,
      this.options
    );
  }

  public logout(mac: string): Observable<void> {
    return this.http.delete<void>(
      `${this.SERVER_PREFIX}logout/${mac}`,
      this.options
    );
  }
}
