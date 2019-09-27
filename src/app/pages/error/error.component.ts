import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataModel} from '../../models';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  error: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: DataModel) => {
      this.error = `${params.status} ${params.data}`;
    });

  }
}
