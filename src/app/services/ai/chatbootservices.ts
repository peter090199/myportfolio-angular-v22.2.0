// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';

// export interface ChatMessage {
//   role: 'user' | 'model';
//   text: string;
//   sectionId?: string;   // e.g. 'skills', 'contact'
//   sectionUrl?: string;  // e.g. 'http://localhost:4200/#skills'
// }

// interface ChatApiResponse {
//   success: boolean;
//   message?: string;
//   reply?: string;
//   error?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class Chatbootservices {
//   private readonly apiUrl = 'http://127.0.0.1:8000/api/website-chat';

//   // Must match the exact section names used in WebsiteKnowledge.php
//   private readonly sectionMap: Record<string, string> = {
//     'home section': 'home',
//     'projects section': 'projects',
//     'skills section': 'skills',
//     'experience section': 'experience',
//     'contact section': 'contact',
//     'about section': 'about',
//   };

//   messages = signal<ChatMessage[]>([]);
//   loading = signal(false);
//   error = signal<string | null>(null);

//   constructor(private http: HttpClient) { }

//   async sendMessage(text: string): Promise<void> {
//     if (!text.trim()) return;

//     this.error.set(null);

//     const userMessage: ChatMessage = { role: 'user', text };
//     this.messages.update(msgs => [...msgs, userMessage]);

//     this.loading.set(true);

//     try {
//       const history = this.messages().slice(0, -1);

//       const response = await firstValueFrom(
//         this.http.post<ChatApiResponse>(this.apiUrl, {
//           message: text,
//           history,
//         })
//       );

//       if (!response.success) {
//         throw new Error(response.message || 'Something went wrong.');
//       }

//       const replyText = response.reply ?? response.message ?? 'No response received.';
//       const sectionId = this.detectSection(replyText);
//       const sectionUrl = sectionId ? this.buildSectionUrl(sectionId) : undefined;

//       this.messages.update(msgs => [
//         ...msgs,
//         { role: 'model', text: replyText, sectionId, sectionUrl }
//       ]);

//     } catch (err: any) {
//       const errorMessage =
//         err?.error?.message ||
//         err?.message ||
//         'Unable to reach the assistant right now.';

//       this.error.set(errorMessage);

//     } finally {
//       this.loading.set(false);
//     }
//   }

//   /**
//    * Looks for a mention of a known section name in the reply text
//    * (case-insensitive) and returns the matching anchor id, if any.
//    */
//   private detectSection(text: string): string | undefined {
//     const lower = text.toLowerCase();

//     for (const [phrase, anchorId] of Object.entries(this.sectionMap)) {
//       if (lower.includes(phrase)) {
//         return anchorId;
//       }
//     }

//     return undefined;
//   }

//   /**
//    * Builds a full clickable URL to a section, based on wherever
//    * the app is currently running (localhost:4200 in dev,
//    * or the real domain once deployed).
//    *
//    * e.g. http://localhost:4200/#skills
//    *      https://pedroyorpo.com/#skills
//    */
//   private buildSectionUrl(anchorId: string): string {
//     return `${window.location.origin}${window.location.pathname}#${anchorId}`;
//   }

//   /**
//    * Smoothly scrolls the page to a given section id
//    * (used when clicking the link within the same page,
//    * instead of a full reload).
//    */
//   scrollToSection(anchorId: string): void {
//     const el = document.getElementById(anchorId);
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       history.replaceState(null, '', `#${anchorId}`);
//     }
//   }
//   clearChat(): void {
//     this.messages.set([]);
//     this.error.set(null);
//   }
// }

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface SectionLink {
  id: string;    // e.g. 'skills'
  label: string; // e.g. 'Skills'
  url: string;   // e.g. 'http://localhost:4200/#skills'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sections?: SectionLink[]; // every section mentioned in this reply
}

interface ChatApiResponse {
  success: boolean;
  message?: string;
  reply?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Chatbootservices {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/website-chat';

  // Must match the exact section names used in WebsiteKnowledge.php
  private readonly sectionMap: Record<string, { id: string; label: string }> = {
    'home section': { id: 'home', label: 'Home' },
    'projects section': { id: 'projects', label: 'Projects' },
    'skills section': { id: 'skills', label: 'Skills' },
    'experience section': { id: 'experience', label: 'Experience' },
    'contact section': { id: 'contact', label: 'Contact' },
    'about section': { id: 'about', label: 'About' },
  };

  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  async sendMessage(text: string): Promise<void> {
    if (!text.trim()) return;

    this.error.set(null);

    const userMessage: ChatMessage = { role: 'user', text };
    this.messages.update(msgs => [...msgs, userMessage]);

    this.loading.set(true);

    try {
      const history = this.messages().slice(0, -1);

      const response = await firstValueFrom(
        this.http.post<ChatApiResponse>(this.apiUrl, {
          message: text,
          history,
        })
      );

      if (!response.success) {
        throw new Error(response.message || 'Something went wrong.');
      }

      const replyText = response.reply ?? response.message ?? 'No response received.';
      const sections = this.detectSections(replyText);

      this.messages.update(msgs => [
        ...msgs,
        { role: 'model', text: replyText, sections }
      ]);

    } catch (err: any) {
      const errorMessage =
        err?.error?.message ||
        err?.message ||
        'Unable to reach the assistant right now.';

      this.error.set(errorMessage);

    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Finds EVERY known section mentioned in the reply text
   * (case-insensitive) and returns a link for each one, in the
   * order they appear. Duplicates are removed.
   */
  private detectSections(text: string): SectionLink[] {
    const lower = text.toLowerCase();
    const found: SectionLink[] = [];
    const seen = new Set<string>();

    for (const [phrase, { id, label }] of Object.entries(this.sectionMap)) {
      if (lower.includes(phrase) && !seen.has(id)) {
        seen.add(id);
        found.push({ id, label, url: this.buildSectionUrl(id) });
      }
    }

    return found;
  }

  /**
   * Builds a full clickable URL to a section, based on wherever
   * the app is currently running (localhost:4200 in dev,
   * or the real domain once deployed).
   *
   * e.g. http://localhost:4200/#skills
   *      https://pedroyorpo.com/#skills
   */
  private buildSectionUrl(anchorId: string): string {
    return `${window.location.origin}${window.location.pathname}#${anchorId}`;
  }

  /**
   * Smoothly scrolls the page to a given section id
   * (used when clicking a link within the same page,
   * instead of a full reload).
   */
  scrollToSection(anchorId: string): void {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${anchorId}`);
    }
  }

  clearChat(): void {
    this.messages.set([]);
    this.error.set(null);
  }
}