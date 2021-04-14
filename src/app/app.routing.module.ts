import { Router, RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactive-guard.service';
import { ServerResolver } from './servers/server/server-resolve.service';

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id/:name', component: UserComponent },
  {
    path: 'servers',
    //canActivate:[AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [{ path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard], data: { message: "edit server" } }]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}