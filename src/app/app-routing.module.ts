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
    path: `404`,
    component: ErrorComponent,
  },
  {
    path: `**`,
    redirectTo: '/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
