import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

import {UserModel} from "../../models";
import {DepartmentInterface, PositionInterface, UserInterface} from "../../interfaces";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})

export class UsersComponent implements OnInit {


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

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<UserModel[] | PositionInterface[] | DepartmentInterface[]>;

  public positionsValue: string;
  public departmentsValue: string;

  public positions: PositionInterface[] = [];
  public departments: DepartmentInterface[] = [];
  public dataArray: any[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def);

    this.route.data.subscribe((data: { users: Array<UserInterface[] | PositionInterface[] | DepartmentInterface[]> }) => {
        data.users.map(res => {
          this.dataArray.push(res)
        });

        this.dataSource = new MatTableDataSource(this.dataArray[0]);
        this.positions = this.dataArray[1];
        this.departments = this.dataArray[2];
      }
    )

  };
}

