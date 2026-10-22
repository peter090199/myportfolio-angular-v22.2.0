import {
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Landing } from '../landing/landing';

// NOTE: `Landing` is intentionally NOT imported/rendered here anymore.
// A navbar shouldn't own the whole page — render <app-navbar> and
// <app-landing> as siblings in whatever component sits above both
// (e.g. AppComponent or a top-level page component).

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [Landing] 
})
export class Navbar implements AfterViewInit, OnDestroy {
  menuOpen = false;
  activeSection = 'home';

  private navObserver?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object, public themeService: ThemeService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // skip entirely on the server

    this.setupActiveSectionTracking();
  }

  ngOnDestroy(): void {
    this.navObserver?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  setActive(section: string): void {
    this.activeSection = section;
    this.closeMenu();
    this.scrollToSection(section);
  }

  private scrollToSection(section: string): void {
    if (!this.isBrowser) return;
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Queries the live document directly rather than ViewChildren, so this
  // works no matter which component actually renders the <section id="...">
  // elements (Landing, in this case).
  private setupActiveSectionTracking(): void {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    this.navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => this.navObserver!.observe(section));
  }
}