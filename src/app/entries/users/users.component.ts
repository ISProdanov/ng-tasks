import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "../models/user.model";
import { Subscription } from "rxjs";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent {
  constructor() {}

  ngOnInit() {}
}
