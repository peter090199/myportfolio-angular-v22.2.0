import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  imports: [
    MatCardModule,
    MatProgressBarModule
  ],
})
export class Skills {

  readonly skills = [
    ['Angular', 95],
    ['C# / .NET', 98],
    ['Laravel', 92],
    ['SQL Server', 98],
    ['React', 80],
    ['Ionic', 95],
    ['React Native', 78],
    ['Firebase', 91]
  ];

}