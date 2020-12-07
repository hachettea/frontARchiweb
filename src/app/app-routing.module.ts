import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizzComponent } from './quizz/quizz.component';
import { VerifyUserGuard } from './verify-user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quizz', component: QuizzComponent, canActivate: [VerifyUserGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'quizz' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
