import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs";

import {DepartmentsService, PositionsService, UsersService} from "../../services";
import {DepartmentInterface, PositionInterface, UserInterface} from "../../interfaces";
import {DepartmentModel, PositionModel, UserModel} from "../../models";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})

export class UsersComponent implements OnInit, OnDestroy {


  public columns: any[] = [
    {
      def: 'firstName',
      name: 'First Name',
      cell: row => `${row.firstName}`
    },
    {
      def: 'lastName',
      name: 'Last Name',
      cell: row => `${row.lastName}`
    },
    {
      def: 'positionName',
      name: 'Position',
      cell: row => `${row.positionName}`
    },
    {
      def: 'departmentName',
      name: 'Department',
      cell: row => `${row.departmentName}`
    }
  ];

  users: UserModel[];

  public displayedColumns: string[];
  public dataSource: any;

  public positionsValue: string;

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def)

    this.route.data.subscribe( (data: {users: Array<UserInterface | PositionInterface | DepartmentInterface>}) => {
      this.dataSource = new MatTableDataSource(data.users);

        console.log(data)
    }

  )

  };

  public departmentsValue: string;

  constructor(

    private route: ActivatedRoute
  ) {
  }

  ngOnDestroy(): void {
    // if (this.usersSubsrcription) {
    //   this.usersSubsrcription.unsubscribe()
    // }
    //
    // if (this.positionsSubsrcription) {
    //   this.positionsSubsrcription.unsubscribe()
    // }
    //
    // if (this.departmentsSubscription) {
    //   this.departmentsSubscription.unsubscribe()
    // }
  }
}

