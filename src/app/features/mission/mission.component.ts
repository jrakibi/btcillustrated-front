import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
  animations: [
    trigger('slideAnimation', [
      // Slide left to right animation
      transition(':increment', group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
        ])
      ])),
      // Slide right to left animation
      transition(':decrement', group([
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
        ])
      ]))
    ])
  ]
})
export class MissionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  currentSlideIndex = 0;
  slides = [
    {
      image: '/assets/images/ai.avif',
      title: 'Breaking complex Bitcoin topic in a simple way',
      content: 'Dive into the intricate world of Bitcoin with our comprehensive learning resources.',
      buttonText: 'Read More',
      buttonLink: '#'
    },
    {
      title: 'Revolutionizing Bitcoin Education',
      content: 'BTCillustrated, where Bitcoin\'s complexities become clear through interactive learning.',
      image: '/assets/images/ai.avif',
      buttonText: 'Read More',
      buttonLink: '#'
    },
    // Generate random content for two more slides
    {
      title: 'Advanced Blockchain Concepts',
      content: 'Dive deep into blockchain technology and its applications beyond cryptocurrencies.',
      image: '/assets/images/ai.avif',
      buttonText: 'Read More',
      buttonLink: '#'
    }
  ];

  goToNextSlide() {
    if (this.currentSlideIndex === this.slides.length - 1) {
      this.currentSlideIndex = 0;
    } else {
      this.currentSlideIndex++;
    }
  }

  goToPreviousSlide() {
    if (this.currentSlideIndex === 0) {
      this.currentSlideIndex = this.slides.length - 1;
    } else {
      this.currentSlideIndex--;
    }
  }
}
