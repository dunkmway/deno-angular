import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Heartbeat = {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Heartbeat>("/api/heartbeat", {
      headers: {
        Authorization: "password"
      }
    })
  }
}
