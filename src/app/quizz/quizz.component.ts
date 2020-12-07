import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
  @Input() userLogged = false;
  constructor() {}

  ngOnInit(): void {}
}
