import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router,
              private fb: FormBuilder, private message: NzMessageService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required , Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm(): void {
    this.authService.register(this.registerForm.value).subscribe(res => {
      if (res.id !== null){
        this.message.success('Register Successfully', {nzDuration: 5000});
        this.router.navigateByUrl('/');
      }
      else{
        this.message.error(`${res.message}`, {nzDuration: 5000});
      }
    });
  }

}
