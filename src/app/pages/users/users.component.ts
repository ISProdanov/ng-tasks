import {Component, OnInit} from "@angular/core";

import {DepartmentsService, PositionsService, UsersService} from "../../services";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit{
  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentService: DepartmentsService
  ) {}

  ngOnInit(): void {
  }
}

