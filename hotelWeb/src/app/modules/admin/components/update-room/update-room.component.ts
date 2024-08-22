import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AdminService} from '../../admin-service/admin-service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {

  updateRoomForm: FormGroup;
  id = this.activatedRoute.snapshot.params['id'];
  constructor(private fb: FormBuilder, private router: Router, private message: NzMessageService,
              private adminService: AdminService, private activatedRoute: ActivatedRoute) {
    this.getRoomById();
  }

  ngOnInit(): void {
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    });
  }
  submitForm(){
    this.adminService.updateRoomDetails(this.id, this.updateRoomForm.value).subscribe(res=>{
      this.message.success("Room Update Successfully", {nzDuration: 50000})
      this.router.navigateByUrl("/admin/dashboard")
    }, error =>{ this.message.error(`${error.error}`, {nzDuration: 5000})
    })
  }
  getRoomById(){
    this.adminService.getRoomById(this.id).subscribe(res => {
      this.updateRoomForm.patchValue(res);
    }, error => {
      this.message.error(`${error.error}`, {nzDuration: 5000});
    });
  }
}
