import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {DepartmentInterface, PositionInterface, UserInterface} from "../../interfaces";
import {DepartmentModel, PositionModel, UserModel} from "../../models";

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
  public dataSource: MatTableDataSource<any>;

  public dataArray: any[] = [];
  public positions: PositionInterface[] = [];
  public departments: DepartmentInterface[] = [];

  public positionsValue: string;
  public departmentsValue: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(x => x.def);

    this.route.data.subscribe((data: { users: Array<UserModel[] | PositionModel[] | DepartmentModel[]> }) => {
        data.users.map(res => {
            this.dataArray.push(res)
          }
        );

        this.dataArray[0].map( (user: UserInterface) => {
          const filteredPosition = this.dataArray[1].filter((position: PositionInterface) => {
            if (user.positionId == position.id) {
              user.positionName = position.name
            }
          });

          if (filteredPosition.length > 0) {
            return filteredPosition
          }

          const filteredDepartment = this.dataArray[2].filter((department: DepartmentInterface) => {
            if (user.departmentId == department.id) {
              user.departmentName = department.name
            }
          });

          if (filteredDepartment.length > 0) {
            return filteredPosition
          }

          return user
        });

        this.dataSource = new MatTableDataSource(this.dataArray[0]);
        this.positions = this.dataArray[1];
        this.departments = this.dataArray[2];
      }
    )

  };
}

