import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentPage = 1;
  rooms = [];
  total: any;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.getRooms();
  }

  ngOnInit(): void {}

  getRooms(): void {
    this.adminService.getRooms(this.currentPage - 1).subscribe(res => {
      this.rooms = res.roomDtoList;
      this.total = res.totalPage * 1;
    });
  }

  PageIndexChange(value: any): void {
    this.currentPage = value;
    this.getRooms();
  }

  showConfirm(roomId: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this room?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.delete(roomId)
    });
  }

  delete(roomId: number): void {
    this.adminService.deleteRoomDetails(roomId).subscribe(() => {
      this.message.success('Room deleted successfully!', { nzDuration: 5000 });
      this.getRooms();
    }, error => {
      this.message.error(`Error: ${error.error}`, { nzDuration: 5000 });
    });
  }
}
