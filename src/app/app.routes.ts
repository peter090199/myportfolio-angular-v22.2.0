import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home)
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about')
        .then(m => m.About)
  },

  {
    path: 'skills',
    loadComponent: () =>
      import('./pages/skills/skills')
        .then(m => m.Skills)
  },

  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects')
        .then(m => m.Projects)
  },

  {
    path: 'experience',
    loadComponent: () =>
      import('./pages/experience/experience')
        .then(m => m.Experience)
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact')
        .then(m => m.Contact)
  },

  {
    path: '**',
    redirectTo: ''
  }
];