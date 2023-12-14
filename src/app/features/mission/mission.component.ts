import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css', './mission.component.scss'],
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
      type: 'video', // A slide with a video
      src: '/assets/videos/explai.mov',
      title: 'Understanding Bitcoin Transactions',
      content: 'Learn how Bitcoin transactions work with our interactive video content.',
      buttonText: 'Learn More',
      buttonLink: '#'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/ai.avif',      
      title: 'Breaking complex Bitcoin topic in a simple way',
      content: 'Dive into the intricate world of Bitcoin with our comprehensive learning resources.',
      buttonText: 'Read More',
      buttonLink: '#'
    },
    {
      title: 'Revolutionizing Bitcoin Education',
      content: 'BTCillustrated, where Bitcoin\'s complexities become clear through interactive learning.',
      type: 'image', // Specify the type of content
      src: '/assets/images/ai.avif',
      buttonText: 'Read More',
      buttonLink: '#'
    },
    // Generate random content for two more slides
    {
      title: 'Advanced Blockchain Concepts',
      content: 'Dive deep into blockchain technology and its applications beyond cryptocurrencies.',
      type: 'image', // Specify the type of content
      image: '/assets/images/ai.avif',
      buttonText: 'Read More',
      buttonLink: '#'
    }
  ];

  goToNextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  goToPreviousSlide(): void {
    this.currentSlideIndex = 
      this.currentSlideIndex === 0 ? this.slides.length - 1 : this.currentSlideIndex - 1;
  }
}
