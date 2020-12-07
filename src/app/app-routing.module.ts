import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizzComponent } from './quizz/quizz.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quizz', component: QuizzComponent },
  { path: '', pathMatch: 'full', redirectTo: 'quizz' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
