import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyUserGuard implements CanActivate {
  private targetRoute = null;

  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {
    if (!authService.connecting) {
      authService.connexion.subscribe(
        () => {
          if (authService.me) {
            router.navigateByUrl(this.targetRoute);
          } else {
            router.navigate(['login']);
          }
        },
        (error) => {
          router.navigate(['login']);
        }
      );
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { url } = state;
    if (!this.authService.me) {
      if (this.targetRoute) {
        this.targetRoute = url;
      }
    }
    if (this.authService.me !== undefined) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
