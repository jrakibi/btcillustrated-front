import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/core/service/article-service';
import { IllustrationService } from 'src/app/core/service/bips-service';
import { HeaderOptions } from './header-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Input() headerOptions: HeaderOptions
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
      description: 'End-to-end encryption and privacy controls.',
      icon: 'assets/icons/visual.png',
      link: '/illustration'
    },
    {
      title: 'MailMerge',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/feed.svg',
      link: '/mailing-list'
    },
    {
      title: 'RoadMap',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/roadmap.png',
      link: '/roadmap'
    },
    {
      title: 'Blog',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/blog.svg',
      link: '/list'
    },
    {
      title: 'Platform',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/terminal.png',
      link: '/support'
    }
    // Add other features as needed
  ];
}
