import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "frontend";
  message = signal("Ping");

  handlePing() {
    if (this.message() == "Ping") {
      fetch("/api/heartbeat")
        .then((response) => response.json())
        .then((data) => this.message.set(data.message));
    } else {
      this.message.set("Ping");
    }
  }
}
