import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Power2 } from 'gsap';
import { IllustrationService } from '../core/service/illustration-service';
import { Category, Illustration, Tag } from '../core/model/illustration-model';
import { HeaderOptions } from '../shared/header/header-options';
import { SearchService } from '../core/service/search-service';
import { TagService } from '../core/service/tag-service';
import { CategoryService } from '../core/service/category-service';
import { trigger, state, style, transition, animate } from '@angular/animations';

const   items = [
  { text: 'uji', first: '2014', second: 'For practice' },
  { text: 'urbs', first: '2014', second: 'For practice' }
];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('toggle', [
      state('false', style({
        height: '0',
        opacity: '0'
      })),
      state('true', style({
        height: '*', // Auto height
        opacity: '1'
      })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out'))
    ])
  ]
})
export class TestComponent  {
  state = false;
  // showFeatures = false;

  // toggleFeatures(expand: boolean): void {
  //   this.state = expand;
  // }
  showFeatures: boolean = false;
  toggleFeatures(): void {
    this.showFeatures = !this.showFeatures;
  }
  features: Array<{title: string, description: string, icon: string}> = [
    {
      title: 'Visuals',
      description: 'End-to-end encryption and privacy controls.',
      icon: 'assets/icons/visual.png'
    },
    {
      title: 'MailMerge',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/feed.svg'
    },
    {
      title: 'RoadMap',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/roadmap.png'
    },
    {
      title: 'Blog',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/blog.svg'
    },
    {
      title: 'Platform',
      description: 'Message and call for free* around the world.',
      icon: 'assets/icons/terminal.png'
    }
    // Add other features as needed
  ];
}