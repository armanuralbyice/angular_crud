import { Component, OnInit } from '@angular/core';
import {UserStorageService} from '../../services/storage/user-storage.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor( private router: Router,
               private fb: FormBuilder, private message: NzMessageService,
               private authService: AuthService ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
  submitForm(): void {
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        if (res.userId) {
          const user = {
            id: res.userId,
            role: res.userRole
          };
          UserStorageService.saveToken(res.jwt);
          UserStorageService.saveUser(user);
          if (UserStorageService.isAdminLogin){
            this.router.navigateByUrl('/admin/dashboard');
          }
          else if (UserStorageService.isCustomerLogin){
            this.router.navigateByUrl('/customer/rooms');
          }
        }
      },
      error => {
        console.log(error);
        this.message.error('Bad credentials', { nzDuration: 5000 });
      }
    );
  }
}
