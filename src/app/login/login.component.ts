import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  wrongCredentials = false;
  me: UserModel;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.wrongCredentials = true;
    } else {
      this.me = undefined;
      this.authService
        .login(
          this.loginForm.controls.username.value,
          this.loginForm.controls.password.value
        )
        .subscribe(
          (res) => {
            this.me = res;
            localStorage.setItem('lastConnection', JSON.stringify(new Date()));
            this.toastr.success(`Bienvenue ${res.username} !!!`, 'Connecté');
          },
          (e) => {}
        );
    }
  }
}
