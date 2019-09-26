import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataModel} from '../../models';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  error: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: DataModel) => {
      this.error = `${params.status} ${params.data}`;
    });
  }

}
