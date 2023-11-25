import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Power2 } from 'gsap';
import { IllustrationService } from '../core/service/illustration-service';
import { Illustration } from '../core/model/illustration-model';
import { HeaderOptions } from '../shared/header/header-options';
const   items = [
  { text: 'uji', first: '2014', second: 'For practice' },
  { text: 'urbs', first: '2014', second: 'For practice' }
];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent  {
  cards = [
    { icon: 'assets/icons/visual.png', text: 'Visuals', link: '/search' },
    { icon: 'assets/icons/feed.svg', text: 'MailMerge', link: '/mailing-list' },
    { icon: 'assets/icons/roadmap.png', text: 'RoadMap', link: '/roadmap' },
    { icon: 'assets/icons/blog.svg', text: 'Blog', link: '/list"' },
    { icon: 'assets/icons/terminal.png', text: 'Plateform', link: '' }
];
headerOptions: HeaderOptions
constructor(
) { }


ngOnInit(): void {
  this.headerOptions = {
    isUnderlineDisplayed: true,
  }
}
}