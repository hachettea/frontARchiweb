import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  @Input() userLogged = false;

  constructor(
    private router: Router,
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
      this.authService.me = undefined;
      this.authService
        .login(
          this.loginForm.controls.username.value,
          this.loginForm.controls.password.value
        )
        .subscribe(
          (res) => {
            this.userLogged = true;
            this.authService.me = res;
            console.log(res);
            if (localStorage.getItem(res.identifiant)) {
              this.toastr.success(
                'Tu as été Connecté pour la dernière fois le ' +
                  localStorage.getItem(res.identifiant),
                `Bienvenue ${res.identifiant} !!!`
              );
              this.router.navigate(['quizz']);
            } else {
              localStorage.setItem(res.identifiant, JSON.stringify(new Date()));
              this.toastr.success(
                "C'est la premiere fois que tu te connecte",
                `Bienvenue ${res.identifiant} !!!`
              );
            }
          },
          (e) => {}
        );
    }
  }
  logout(): void {
    this.authService.logout().subscribe((res) => {
      this.userLogged = false;
    });
  }
}
