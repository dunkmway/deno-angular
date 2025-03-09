import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeartbeatService } from "./api/heartbeat.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "frontend";
  message = signal("Check server heartbeat");

  private heartbeat = inject(HeartbeatService);

  handlePing() {
    this.heartbeat.get().subscribe(response => {
      this.message.set(response.message);
    })
  }
}
