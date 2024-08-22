import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AdminService} from '../../admin-service/admin-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  roomDetailsForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private message: NzMessageService,
              private adminService: AdminService){}

  ngOnInit(): void {
  this.roomDetailsForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    price: ['', Validators.required]
  });
  }

  submitForm(){
    this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe(res => {
      this.message.success('Room Added Successfully', {nzDuration: 5000});
      this.router.navigateByUrl('/admin/dashboard');
    }, error => {
      this.message.error(`${error.error}`, {nzDuration: 5000});
    });
  }

}
