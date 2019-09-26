import { Component, OnInit } from '@angular/core';
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public error: string;

  constructor(public mainService: MainService) { }

  ngOnInit() {
  }

}
