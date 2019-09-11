import {Component, OnDestroy, OnInit} from "@angular/core";

import {Subscription} from "rxjs";

import {User} from "../../models";
import {DepartmentsService, PositionsService, UsersService} from "../../services";
import {DepartmentInterface, PositionInterface, UserInterface} from "../../interfaces";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  usersSubsrcription: Subscription;
  displayedColumns: string[] = ['firstName', 'lastName', 'positionName', 'departmentName'];
  dataSource = this.users;

  constructor(
    private usersService: UsersService,
    private positionsService: PositionsService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.usersSubsrcription = this.usersService.getUsers()
      .subscribe( (users: User[]) => {
        this.dataSource = users;

        this.users = users;
    });

    this.positionsService.getPositions()
      .subscribe((positions) => this.departmentsService.getDepartments()
        .subscribe((departments) => this.usersService.getUsers()
          .subscribe(() => {
            this.users.map( (user: UserInterface) => {
              positions.filter( (position: PositionInterface) => {
                 if (user.positionId == position.id) {
                   user.positionName = position.name;
                 }
              });
              
              departments.filter( (department: DepartmentInterface) => {
                if (user.departmentId == department.id) {
                  user.departmentName = department.name
                }
              })
            })
        })));

  }

  ngOnDestroy(): void {
    if (this.usersSubsrcription) {
      this.usersSubsrcription.unsubscribe()
    }
  }
}

