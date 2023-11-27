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
  @Input() headerOptions: HeaderOptions
  @Input() showFeature: boolean
  isDarkMode = true; // Assuming dark mode is the default
  state = false;
  // showFeatures = false;

  // toggleFeatures(expand: boolean): void {
  //   this.state = expand;
  // }
  showFeatures: boolean = false;

  constructor() {

  }
  ngOnInit(): void {
    debugger
    if(this.headerOptions) {
      this.isDarkMode = this.headerOptions.isDarkMode
    }
    if(this.showFeature) {
      this.showFeatures = this.showFeature
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showFeature) {
      this.showFeatures = changes.showFeature.currentValue
    }
  }
  
  toggleFeatures(): void {
    this.showFeatures = !this.showFeatures;
  }
  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
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
