import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import { UpdateRoomComponent } from './components/update-room/update-room.component';
import {NzModalModule} from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [AdminComponent, DashboardComponent, AddRoomComponent, UpdateRoomComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzIconModule,
    NzPaginationModule,
    NzModalModule
  ]
})
export class AdminModule { }
