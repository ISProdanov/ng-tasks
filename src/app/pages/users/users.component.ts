import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';

import {DepartmentInterface, PositionInterface, UserInterface} from '../../interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
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
  public dataSource: MatTableDataSource<UserInterface[] | PositionInterface[] | DepartmentInterface[]>;

  public positionsValue: string;
  public departmentsValue: string;

  public positions: PositionInterface[];
  public departments: DepartmentInterface[];
  public dataArray: any[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def);

    this.route.data.subscribe(
      (data: { users: Array<UserInterface[] | PositionInterface[] | DepartmentInterface[]> }) => {
        const users = data.users[0];
        const positions = data.users[1];
        const departments = data.users[2];

        this.dataSource = new MatTableDataSource(users);
        this.positions = positions;
        this.departments = departments;
      }
    );
  }
}
