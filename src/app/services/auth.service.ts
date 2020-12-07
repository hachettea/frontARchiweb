import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  connecting = false;
  me: UserModel;
  connexion = new Subject<any>();

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

  logout() {
    return this.http.post(
      `${environment.host}/logout`,
      {},
      { withCredentials: true }
    );
  }

  getInfos(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.host}/login`, {
      withCredentials: true,
    });
  }
}
