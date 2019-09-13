import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs";

import {DepartmentsService, PositionsService, UsersService} from "../../services";
import {DepartmentInterface, PositionInterface, UserInterface} from "../../interfaces";
import {User} from "../../models";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})

export class UsersComponent implements OnInit, OnDestroy {
  public positions: PositionInterface[];
  public departments: DepartmentInterface[];

  public usersSubsrcription: Subscription;
  public positionsSubsrcription: Subscription;
  public departmentsSubscription: Subscription;

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
  public displayedColumns = this.columns.map( x => x.def)
  public dataSource = new MatTableDataSource();

  public positionsValue: string;
  public departmentsValue: string;

  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.forEach( (data: {user: User[]}) =>
      this.positionsSubsrcription = this.positionsService.getPositions()
      .subscribe((positions: PositionInterface[]) => {
          this.departmentsSubscription = this.departmentsService.getDepartments()
            .subscribe((departments: DepartmentInterface[]) => {
              this.usersSubsrcription = this.usersService.getUsers()
                .subscribe((users: UserInterface[]) => {
                  users.map((user: UserInterface) => {
                    this.dataSource = new MatTableDataSource(users);

                    this.positions = positions;
                    this.departments = departments;

                    user.positionName = '';
                    user.departmentName = '';

                    this.positions.filter((position: PositionInterface) => {
                      if (user.positionId == position.id) {
                        user.positionName = position.name;
                      }
                    });

                    this.departments.filter((department: DepartmentInterface) => {
                      if (user.departmentId == department.id) {
                        user.departmentName = department.name;
                      }
                    })
                  })
                })
            })
        }
      ));
  };

  ngOnDestroy(): void {
    if (this.usersSubsrcription) {
      this.usersSubsrcription.unsubscribe()
    }

    if (this.positionsSubsrcription) {
      this.positionsSubsrcription.unsubscribe()
    }

    if (this.departmentsSubscription) {
      this.departmentsSubscription.unsubscribe()
    }
  }
}

