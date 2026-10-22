import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  title: string;
  description: string;
  category: 'Web' | 'Mobile' | 'Desktop';
  technologies: string[];
  link?: string;
  comingSoon?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {

  filter: 'All' | 'Web' | 'Mobile' | 'Desktop' = 'All';

  filters: Array<'All' | 'Web' | 'Mobile' | 'Desktop'> = [
    'All',
    'Web',
    'Mobile',
    'Desktop'
  ];

  projects: Project[] = [

    {
      title: 'Nexsuz',
      description:
        'Professional networking platform connecting job seekers, professionals, recruiters and companies.',
      category: 'Web',
      technologies: [
        'Angular',
        'Laravel',
        'MySQL',
        'Cloudflare'
      ],
      link: 'https://nexsuz.com'
    },

    {
      title: 'Todo Management',
      description:
        'Responsive task management application with authentication and Firebase integration.',
      category: 'Mobile',
      technologies: [
        'Ionic',
        'Firebase',
        'TypeScript'
      ]
    },

    {
      title: 'Nexsuz Mobile',
      description:
        'Cross-platform mobile application connected to a Laravel API backend.',
      category: 'Mobile',
      technologies: [
        'Ionic',
        'Laravel'
      ],
      comingSoon: true
    },

    {
      title: 'Customize Payroll System',
      description:
        'Mariosoft Business payroll system for employee records, salary computation, deductions and payslip generation.',
      category: 'Desktop',
      technologies: [
        'C#',
        '.NET',
        'SQL Server'
      ]
    }

  ];

  get filteredProjects(): Project[] {
    if (this.filter === 'All') {
      return this.projects;
    }

    return this.projects.filter(
      project => project.category === this.filter
    );
  }

  setFilter(
    filter: 'All' | 'Web' | 'Mobile' | 'Desktop'
  ): void {
    this.filter = filter;
  }
}