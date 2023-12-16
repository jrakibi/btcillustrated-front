import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArticleService } from 'src/app/core/service/article-service';
import { IllustrationService } from 'src/app/core/service/bips-service';
import { HeaderOptions } from './header-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() headerOptions: HeaderOptions;
  @Input() showFeature: boolean;
  isDarkMode: boolean = true
  isTransparent: boolean = false
  showFeatures: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.applyHeaderOptions();
    this.showFeatures = this.showFeature;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.headerOptions) {
      this.applyHeaderOptions();
    }

    if (changes.showFeature) {
      this.showFeatures = changes.showFeature.currentValue;
    }
  }
  
  applyHeaderOptions(): void {
    if (this.headerOptions) {
      this.isDarkMode = this.headerOptions.isDarkMode ?? this.isDarkMode;
      this.isTransparent = this.headerOptions.isTransparent ?? this.isTransparent;
    }
  }

  get headerClass(): string {
    if(this.headerOptions) {
      if (this.headerOptions.isTransparent) {
        return 'header transparent-mode';
      } else if (this.headerOptions.isDarkMode) {
        return 'header dark-mode';
      } else {
        return 'header light-mode';
      }
    } else {
      return 'header dark-mode';
    }
    
  }

  toggleFeatures(): void {
    this.showFeatures = !this.showFeatures;
  }

  toggleMode(): void {
    if (this.isTransparent) {
      // If currently transparent, toggle to dark mode
      this.isTransparent = false;
      this.isDarkMode = true;
    } else {
      // Otherwise, just toggle between dark and light mode
      this.isDarkMode = !this.isDarkMode;
    }
  }
  features: Array<{title: string, description: string, icon: string, link: string}> = [
    {
      title: 'Visuals',
      description: 'Breaking complex Bitcoin topic in a simple way',
      icon: 'assets/icons/visual.png',
      link: '/illustration'
    },
    {
      title: 'MailMerge',
      description: 'Daily summaries of Bitcoin-dev mailing list.',
      icon: 'assets/icons/feed.svg',
      link: '/mailing-list'
    },
    {
      title: 'RoadMap',
      description: 'Your step-by-stepguide to mastering Bitcoin.',
      icon: 'assets/icons/roadmap.png',
      link: '/roadmap'
    },
    {
      title: 'Blog',
      description: 'Learn about Censensus protocol.',
      icon: 'assets/icons/blog.svg',
      link: '/list'
    },
    {
      title: 'Platform',
      description: 'A full Bitcoin course that takes youfrom 0 to 1.',
      icon: 'assets/icons/terminal.png',
      link: '/support'
    }
    // Add other features as needed
  ];
}
