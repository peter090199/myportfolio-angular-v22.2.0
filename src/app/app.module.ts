import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Projects } from './pages/projects/projects';
@NgModule({
  declarations: [
  ],

  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],

  providers: [],

  bootstrap: [
  ]
})
export class AppModule {}