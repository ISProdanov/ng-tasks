import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';

import {DepartmentInterface, PositionInterface, UserInterface} from '../../interfaces';
import {DepartmentModel, PositionModel, UserModel} from "../../models";

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

  public dataSubscription: Subscription;

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<UserInterface>;

  public positionsValue: string;
  public departmentsValue: string;

  public positions: PositionInterface[] = [];
  public departments: DepartmentInterface[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def);

    this.dataSubscription = this.route.data.subscribe(
      (data: { users: Array<UserModel[] | PositionModel[] | DepartmentModel[]> }) => {
        const users = data.users[0] as UserModel[];
        const positions = data.users[1] as PositionModel[];
        const departments = data.users[2] as DepartmentModel[];

        console.log(data.users)

        this.dataSource = new MatTableDataSource(users);
        this.positions = positions;
        this.departments = departments;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
