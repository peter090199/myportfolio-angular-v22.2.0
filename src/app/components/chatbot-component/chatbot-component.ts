import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chatbootservices } from '../../services/ai/chatbootservices';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-chatbot-component',
  styleUrl: './chatbot-component.scss',
  templateUrl: './chatbot-component.html',
})
export class ChatbotComponent implements AfterViewChecked {
  chat = inject(Chatbootservices);

  userInput = signal('');
  isOpen = signal(false);

  suggestedQuestions = [
    'What services does Pedro offer?',
    'What technologies does he use?',
    'Show me his projects',
    'How can I contact him?',
  ];

  @ViewChild('messagesEnd') messagesEnd?: ElementRef<HTMLDivElement>;

  toggleChat(): void {
    this.isOpen.update(open => !open);
  }

  async send(): Promise<void> {
    const text = this.userInput().trim();
    if (!text || this.chat.loading()) return;

    this.userInput.set('');
    await this.chat.sendMessage(text);
  }

  async sendSuggestion(question: string): Promise<void> {
    if (this.chat.loading()) return;
    await this.chat.sendMessage(question);
  }

  onSectionLinkClick(event: MouseEvent, anchorId: string): void {
    event.preventDefault();
    this.chat.scrollToSection(anchorId);
    this.isOpen.set(false);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  ngAfterViewChecked(): void {
    this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}