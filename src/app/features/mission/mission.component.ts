import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations';
import { SlickCarouselComponent } from 'ngx-slick-carousel';


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
export class MissionComponent implements OnInit  {

  constructor() { }

  ngOnInit(): void {
  }

  currentSlideIndex = 0;
  slides = [

    {
      type: 'video', // A slide with a video
      src: '/assets/videos/dailyUpdate.mov',
      title: 'Leverage AI to explain latest development',
      content: 'The latest news about the Bitcoin protocol and innovations from the community.',
      buttonText: 'Start Now',
      buttonLink: '#'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/coding.png',      
      title: 'Bitcoin Focused',
      content: "We are 100% Focused on Bitcoin and it's ecosystem",
      buttonText: 'Start Now',
      buttonLink: '#'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/coding2.png',      
      title: 'Interactive Coding Lessons',
      content: 'in-browser, step-by-step lessons guide you through the fundamentals of Bitcoin. Start building your first Bitcoin-driven application today.',
      buttonText: 'Coming Soon',
      buttonLink: '#'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/svg/foundation.svg',      
      title: 'Gain a deep understanding of Bitcoin',
      content: 'Learn All About the Bitcoin Network and How it Operates',
      buttonText: 'Start Now',
      buttonLink: '#'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/svg/circle.png',      
      title: 'Breaking complex Bitcoin topic in a simple way',
      content: 'Dive into the intricate world of Bitcoin with our comprehensive learning resources.',
      buttonText: 'Start Now',
      buttonLink: '#'
    },

    // {
    //   type: 'video', // A slide with a video
    //   src: '/assets/videos/explai.mov',
    //   title: 'Understanding Bitcoin Transactions',
    //   content: 'Learn how Bitcoin transactions work with our interactive video content.',
    //   buttonText: 'Start Now',
    //   buttonLink: '#'
    // },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/svg/grants.svg',      
      title: 'Breaking complex Bitcoin topic in a simple way',
      content: 'Dive into the intricate world of Bitcoin with our comprehensive learning resources.',
      buttonText: 'Start Now',
      buttonLink: '#'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/svg/network.svg',      
      title: 'Breaking complex Bitcoin topic in a simple way',
      content: 'Dive into the intricate world of Bitcoin with our comprehensive learning resources.',
      buttonText: 'Start Now',
      buttonLink: '#'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/svg/modules.svg',      
      title: 'Breaking complex Bitcoin topic in a simple way',
      content: 'Dive into the intricate world of Bitcoin with our comprehensive learning resources.',
      buttonText: 'Start Now',
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





  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  slideConfig = {
    infinite: false,
    arrows: true,
    dots: true,
    autoplay: false,
    speed: 1100,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  items = [
    {
      year: '#1 Phase',
      title: 'Illustrations',
      description: 'Breaking complex Bitcoin topic in a simple way',
      type: 'video',
      source: 'assets/videos/visuals.mov',
      poster: 'assets/images/illustrations.png',
      // poster: 'assets/videos/visuals.png',
      features: [
        { name: 'Visuals for Bitcoin concepts and BIPs', done: true },
        { name: 'AI chatbot to ask for detailed clarification', done: true },
        { name: 'Lightning integration for Tipping', done: true },
        { name: 'Complete illustration set', done: false },
      ],
    },
    {
      year: '#2 Phase',
      title: 'Daily Update',
      description: 'Daily updates and summaries of news about Bitcoin and LN development',
      type: 'video',
      source: 'assets/videos/dailyUpdate.mov',
      poster: 'assets/videos/dailyUpdate.png',
      features: [
        { name: 'Daily digests on Bitcoin and LN development', done: true },
        { name: 'AI feature to convert email from Bitcoin-dev mailing list into an interactive dialog.', done: true },
        { name: 'Adjust tone of the generated conversation for non-technical reader', done: false },
        { name: 'Curate news from other credible sources (Eg. Bitcoin Optech)', done: false },
        // { name: 'Extract important  keyword from the conversation and connect each to my own Bitcoin illustrations, @bitcoinoptech, or other reputable Bitcoin resources for in-depth exploration..', done: false },
      ],
    },
    {
      year: '#3 Phase',
      title: 'RoadMap',
      description: 'Your step-by-step guide to mastering Bitcoin development',
      type: 'video',
      source: 'assets/videos/roadmap.mov',
      poster: 'assets/videos/roadmap.png',
      features: [
        { name: 'Step by step guide to becoming a Bitcoin developer in 2023', done: true },
        { name: 'Create a UI that allow the community to contribute and add links to articles, videos and other resources.', done: false },
        { name: 'Allow the user to track his progress on the roadmap', done: false },
      ],
    },
    {
      year: '#4 Phase',
      title: 'Bitcoin Course',
      description: 'The all-new interactive learning experience that teaches you everything about Bitcoin',
      type: 'image',
      source: 'assets/images/BITCOIN.png',
      features: [
        { name: '12 Modules that expalains Bitcoin from A to Z', done: false },
        { name: 'Real world inspired Projects', done: false },
        { name: 'Integrate an IDE for developers to code inside the platfrom', done: false },
      ],
    },
    {
      year: '#5 Phase',
      title: 'Lightning Course',
      description: 'The all-new interactive learning experience that teaches you everything about Lightning',
      type: 'image',
      source: 'assets/images/LIGHTNING.png',
      features: [
        { name: '12 Modules that expalains Bitcoin from A to Z', done: false },
        { name: 'Real world inspired Projects', done: false },
        { name: 'Integrate an IDE for developers to code inside the platfrom', done: false },
      ],
    },
    {
      year: '#6 Phase',
      title: 'BIPS',
      description: 'Explain BIPS with animations',
      type: 'image',
      source: 'assets/images/BIPS.png',
      features: [
        { name: '12 Modules that expalains Bitcoin from A to Z', done: false },
        { name: 'Real world inspired Projects', done: false },
        { name: 'Integrate an IDE for developer inside the platfrom', done: false },
      ],
    },
    {
      year: '#7 Phase',
      title: 'Bitcoin Open Source Onboarding',
      description: "Onboard more developers to contibute in the Bitcoin Core ",
      type: 'image',
      source: 'assets/images/ONBOARDING.png',
      features: [
        { name: "-- Currently, I'm not qualified or equipped to delve deeply into this phase on my own. I'll be seeking the community's assistance to collaborate and help push this phase forward. --", done: false },
      ]
    },


    // ill be reinforced and solidified in 3 challenging projects, woven between the modules. You'll use your newfound skills to build:
    // ... more items ...
  ];


  prevSlide() {
    this.slickModal.slickPrev();
  }

  nextSlide() {
    this.slickModal.slickNext();
  }

  addSlide() {
    // You can push more items to the timelineItems array
  }

  removeSlide() {
    // You can splice items from the timelineItems array
  }

  afterChange(e) {
    console.log('afterChange', e);
    // Handle the afterChange event here
  }
  @ViewChildren('videoPlayer') videoPlayers: QueryList<ElementRef>;

  currentlyPlayingIndex: number | null = null;



  
  playVideo(event: Event, index: number): void {
    event.preventDefault();
    const videoElement = this.videoPlayers.toArray()[index].nativeElement;

    if (videoElement.paused) {
      // If any other video is playing, pause it
      if (this.currentlyPlayingIndex !== null) {
        const playingElement = this.videoPlayers.toArray()[this.currentlyPlayingIndex].nativeElement;
        playingElement.pause();
      }
      videoElement.play();
      this.currentlyPlayingIndex = index;
    } else {
      videoElement.pause();
      this.currentlyPlayingIndex = null;
    }
  }

  isHovering: boolean = false;

  onVideoMouseEnter(index: number): void {
    if (this.currentlyPlayingIndex === index) {
      this.isHovering = true;
    }
  }
  
  onVideoMouseLeave(index: number): void {
    this.isHovering = false;
  }
  
}



























// items = [
//   {
//     year: '#1 Phase',
//     title: 'Illustrations',
//     description: 'Breaking complex Bitcoin topic in a simple way',
//     type: 'video',
//     source: 'assets/videos/visuals.mov',
//     // poster: 'assets/images/ai.avif',
//     features: [
//       { name: 'Visuals to simplify complex concepts and BIPs', done: true },
//       { name: 'AI tool to ask for more clarification', done: true },
//       { name: 'Tip with Lightning', done: true },
//       { name: 'Add Remaining illustrations', done: false },
//     ],
//   },

//   {
//     year: '#2 Phase',
//     title: 'Daily Update',
//     description: 'Daily updates and summaries of news about Bitcoin and LN development',
//     type: 'video',
//     source: 'assets/videos/dailyUpdate.mov',
//     // poster: 'assets/images/ai.avif',
//     features: [
//       { name: 'Consume mailing-list-summaries repo to get daily summarized posts from the bitcoin-dev mailing lists.', done: true },
//       { name: 'AI feature to turn each into an interactive and comprehensible conversation between you and the email author.', done: true },
//       { name: 'Adjust tone of the generated conversation for non-technical reader', done: false },
//       { name: 'Add more references to get news about Bitcoin development (Eg. Bitcoin Optech)', done: false },
//       { name: 'Extract important  keyword from the conversation and connect each to my own Bitcoin illustrations, @bitcoinoptech, or other reputable Bitcoin resources for in-depth exploration..', done: false },
//     ],

//   },
//   // Video items
//   {
//     year: '#3 Phase',
//     title: 'RoadMap',
//     description: 'Your step-by-step guide to mastering Bitcoin development',
//     type: 'video',
//     source: 'assets/videos/roadmap.mov',
//     features: [
//       { name: 'Step by step guide to becoming a Bitcoin developer in 2023', done: true },
//       { name: 'Create a UI that allow the community to contribute and add links to articles, videos and other resources.', done: false },
//       { name: 'Allow the user to track his progress on the roadmap', done: false },
//     ],
//   },
//   {
//     year: '#4 Phase',
//     title: 'RoadMap',
//     description: 'Your step-by-step guide to mastering Bitcoin development',
//     type: 'video',
//     source: 'assets/videos/roadmap.mov',
//     features: [
//       { name: 'Step by step guide to becoming a Bitcoin developer in 2023', done: true },
//       { name: 'Create a UI that allow the community to contribute and add links to articles, videos and other resources.', done: false },
//       { name: 'Allow the user to track his progress on the roadmap', done: false },
//     ],
//   },

//   // ... more items ...
// ];