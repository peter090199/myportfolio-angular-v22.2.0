import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
   imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class Home implements OnInit, OnDestroy {
  phrases: string[] = [
    'Software Engineer',
    'Full-Stack Developer'
  ];

  typedText = signal('');

  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: any;

  ngOnInit(): void {
    this.type();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  private type(): void {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.typedText.set(currentPhrase.substring(0, this.charIndex));

    let speed = this.isDeleting ? 20 : 45;

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      speed = 1000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      speed = 200;
    }

    this.timeoutId = setTimeout(() => this.type(), speed);
  }
}