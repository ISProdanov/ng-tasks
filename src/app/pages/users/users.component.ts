import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {DataModel, DepartmentModel, PositionModel, UserModel} from '../../models';


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

  public error: string;
  public dataSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def);
    this.initData();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  public initData() {
    this.error = null;

    this.dataSubscription = this.route.data.subscribe(
      (data: { users: DataModel[] }) => {
        data.users.map( (respData: DataModel) => {
          if (respData.status !== 200) {
            this.router.navigate(['/404']);
          } else {
            const users = data.users[0].data as UserModel[];
            const positions = data.users[1].data as PositionModel[];

            const departments = data.users[2].data as DepartmentModel[];

            users.map((user: UserModel) => {
              user.positionName = '';
              user.departmentName = '';

              const filteredPosition = positions.filter((position: PositionModel) => {
                return user.positionId === position.id;
              });

              if (filteredPosition.length > 0) {
                user.positionName = filteredPosition[0].name;
              }

              const filteredDepartment = departments.filter((department: DepartmentModel) => {
                return user.departmentId === department.id;
              });

              if (filteredDepartment.length > 0) {
                user.departmentName = filteredDepartment[0].name;
              }

              return user;
            });

            this.dataSource = new MatTableDataSource(users);
            this.positions = positions;
            this.departments = departments;
          }
        });
      },
    );
  }
}
