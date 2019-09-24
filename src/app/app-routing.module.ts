import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './pages';
import {UsersResolver} from './services';


const routes: Routes = [
  {
    path: ``,
    component: UsersComponent,
    resolve: {
      users: UsersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
