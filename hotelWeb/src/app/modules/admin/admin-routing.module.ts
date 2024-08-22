import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddRoomComponent} from './components/add-room/add-room.component';
import {UpdateRoomComponent} from './components/update-room/update-room.component';

const routes: Routes = [{ path: '', component: AdminComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'room', component: AddRoomComponent},
  {path: 'room/:id/edit', component: UpdateRoomComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
