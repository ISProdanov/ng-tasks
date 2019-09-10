import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";

import { User } from "src/app/entries/models/user.model";
import { UserService } from "src/app/entries/services/user.service";
import { PositionsService } from 'src/app/entries/services/positions.service';

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent implements OnInit {
  users: User[] = [];
  userSubscr: Subscription;
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "positionName",
    "departmentName"
  ];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(
    private userService: UserService,
    private positionsService: PositionsService
    ) {}

  ngOnInit() {
    this.positionsService.getPositions();

    this.userSubscr = this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource.data = users;
    });
  }

  ngOnDestroy() {
    this.userSubscr.unsubscribe();
  }
}
