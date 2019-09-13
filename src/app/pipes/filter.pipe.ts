import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dataSource: any, position: any, department: any): any {
    if( position === undefined || department === undefined ) return dataSource.data;

    if (position && department) {
      return dataSource.data.filter(user => {
        return user.positionId === position && user.departmentId === department
      })
    }
  }
}
