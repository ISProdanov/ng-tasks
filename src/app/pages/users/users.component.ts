import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';

import {DepartmentInterface, PositionInterface, UserInterface} from '../../interfaces';

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
      (data: { users: Array<UserInterface[] | PositionInterface[] | DepartmentInterface[]> }) => {
        const users = data.users[0] as UserInterface[];
        const positions = data.users[1] as PositionInterface[];
        const departments = data.users[2] as DepartmentInterface[];

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
