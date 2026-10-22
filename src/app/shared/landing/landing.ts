import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ViewChildren,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Home } from '../../pages/home/home';
import { Projects } from '../../pages/projects/projects';
import { Contact } from '../../pages/contact/contact';
import { Skills } from '../../pages/skills/skills';
import { Experience } from '../../pages/experience/experience';
import { About } from '../../pages/about/about';


@Component({
  imports: [Home, Projects, Contact, Skills, Experience, About],
  selector: 'app-landing',
  styleUrl: './landing.scss',
  templateUrl: './landing.html',
})
export class Landing {}
