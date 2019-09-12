import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";

import {Subscription} from "rxjs";

import {DepartmentsService, PositionsService, UsersService} from "../../services";
import {DepartmentInterface, PositionInterface, UserInterface} from "../../interfaces";

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

  public displayedColumns: string[] = ['firstName', 'lastName', 'positionName', 'departmentName'];
  public dataSource: any;

  public selectedValue: string;

  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
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
      );
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

