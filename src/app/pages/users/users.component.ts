import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';

import {DepartmentModel, PositionModel, UserModel} from '../../models';
import {Subscription} from 'rxjs';
import {DepartmentInterface, PositionInterface} from "../../interfaces";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
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

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;

  public positions: PositionModel[] = [];
  public departments: DepartmentModel[] = [];

  public positionsValue: string;
  public departmentsValue: string;

  public error = '';
  public dataSubscr: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def);
    this.initData();
  }

  ngOnDestroy(): void {
    if (this.dataSubscr) {
      this.dataSubscr.unsubscribe();
    }
  }

  public initData() {
    this.dataSubscr = this.route.data.subscribe(
      (data: { users: Array<UserModel[] | PositionModel[] | DepartmentModel[]> }) => {
        data.users[0].map((user: UserModel) => {
          user.positionName = '';
          user.departmentName = '';

          const filteredPosition = data.users[1].filter((position: PositionInterface) => {
            return user.positionId === position.id;
          });

          if (filteredPosition.length > 0) {
            return user.positionName = filteredPosition[0].name;
          }

          const filteredDepartment = data.users[2].filter((department: DepartmentInterface) => {
            return user.departmentId === department.id;
          });

          if (filteredDepartment.length > 0) {
            return user.departmentName = filteredDepartment[0].name;
          }

          return user;
        })
      });
    //
    // this.dataSource = new MatTableDataSource(data.users[0]);
    // this.positions = data.users[1];
    // this.departments = data.users[2];
    // },
    // error => {
    //   return this.error = error;
    // }
    // );
    // }
  }
}
