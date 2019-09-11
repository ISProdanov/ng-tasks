import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {DepartmentsService} from "../../services/departments.service";
import {PositionsService} from "../../services/positions.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit{
  constructor(
    private usersService: UsersService
    ,
    private positionsService: PositionsService
    ,
    private departmentService: DepartmentsService

  ) {}

  ngOnInit(): void {
  }
}

