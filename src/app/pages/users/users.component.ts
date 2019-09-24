import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';

import {UserInterface} from '../../interfaces';
import {DepartmentModel, PositionModel} from '../../models';

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
  public dataSource: MatTableDataSource<UserInterface>;

  public positionsValue: string;
  public departmentsValue: string;

  public positions: PositionModel[] = [];
  public departments: DepartmentModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def);

    this.route.data.subscribe(
      (data: { users: Array<UserInterface[] | PositionModel[] | DepartmentModel[]> }) => {
        const users = data.users[0] as UserInterface[];
        const positions = data.users[1] as PositionModel[];
        const departments = data.users[2] as DepartmentModel[];
        users.map((user: UserInterface) => {
          user.positionName = '';
          user.departmentName = '';

          const filteredPositions = positions.filter( (position: PositionModel) => {
              return user.positionId === position.id;
            }
          );
          if (filteredPositions.length > 0) {
            user.positionName = filteredPositions[0].name;
          }
          const filteredDepartments = departments.filter( (department: DepartmentModel) => {
              return user.positionId === department.id;
            }
          );
          if (filteredDepartments.length > 0) {
            user.departmentName = filteredDepartments[0].name;
          }
          return user;
        });

        this.dataSource = new MatTableDataSource(users);
        this.positions = positions;
        this.departments = departments;
      }
    );
  }
}

