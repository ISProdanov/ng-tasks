import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ErrorComponent, UsersComponent} from './pages';
import {UsersResolver} from './services';


const routes: Routes = [
  {
    path: ``,
    component: UsersComponent,
    resolve: {
      users: UsersResolver
    }
  },
  {
    path: `error`,
    component: ErrorComponent,
  },
  {
    path: `error/:error-status:error-data`,
    component: ErrorComponent,
  },
  {
    path: `**`,
    redirectTo: `/error`,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
