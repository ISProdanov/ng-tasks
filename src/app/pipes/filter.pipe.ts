import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dataSource: any, terms: any): any {
    if( terms === undefined ) return dataSource.data;

    if (terms) {
      return dataSource.data.filter(user => user.positionId === terms)
    }
  }
}
