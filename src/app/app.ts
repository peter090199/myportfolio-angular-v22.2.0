import { Component } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { ChatbotComponent } from './components/chatbot-component/chatbot-component';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}