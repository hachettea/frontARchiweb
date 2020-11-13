import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(
      `${environment.host}/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
  }
}
