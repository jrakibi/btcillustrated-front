import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { HeaderOptions } from 'src/app/shared/header/header-options';

declare const twttr: any; // This declares the Twitter object which will be loaded later

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
  @ViewChild('missionSection') missionSection: ElementRef;
  headerOptions: HeaderOptions

  constructor() { }

  ngOnInit(): void {
    this.headerOptions = {
      isUnderlineDisplayed: true,
      isTransparent: true
    }

    // Dynamically load the Twitter script
    if (!window['twttr']) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      document.body.appendChild(script);
    } else {
      twttr.widgets.load();
    }
  }

  currentSlideIndex = 0;
  slides = [

    {
      type: 'video', // A slide with a video
      src: '/assets/videos/dailyUpdate.mov',
      title: 'Leverage AI to explain the latest developments',
      content: 'The latest news about the Bitcoin protocol and innovations from the community.',
      buttonText: 'Start Now',
      buttonLink: '/mailing-list'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/bitcoin-only.svg',      
      title: 'Bitcoin Focused',
      content: "A platform 100% Focused on Bitcoin and it's ecosystem",
      buttonText: 'Start Now',
      buttonLink: '/home'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/coding3.png',      
      title: 'Interactive Coding Lessons',
      content: 'In-browser, step-by-step lessons guide you through the fundamentals of Bitcoin. Start building your first Bitcoin-driven application today.',
      buttonText: 'Coming Soon',
      buttonLink: '/home'
    },
    {
      type: 'image', // Specify the type of content
      src: '/assets/images/visuals-set.svg',      
      title: 'Breaking complex Bitcoin topic in a simple way',
      content: 'A platform rich with Visuals and animations to simplify complex technical Bitcoin concepts and BIPs.',
      buttonText: 'Start Now',
      buttonLink: '/illustration'
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
        { name: 'Adjust tone of conversation for non-technical reader', done: false },
        { name: 'Curate news from other sources (Eg. Bitcoin Optech)', done: false },
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
      description: 'An interactive learning experience designed to help developers become confident with Lightning Network',
      type: 'image',
      source: 'assets/images/LIGHTNING.png',
      features: [
        { name: 'Modules that explains Lightning', done: false },
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
        { name: 'Collection of Visuals and animations to explain BIPS', done: false },
        { name: 'Documenting bitcoin Opcodes', done: false }
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
  
  scrollToMission(): void {
    this.missionSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  // tweets = [
  //   { id: '1666470998160318467' },
  //   { id: '1706722987796238615' },
  //   { id: '1688216939456319488' },
  //   { id: '1674140683450593280' },
  //   { id: '1696415151652581462' },
  //   { id: '1644885090588147712' },
  //   { id: '1664341518524489737' },
  //   { id: '1712580270853857659' },
  //   { id: '1706743656965980444' },
  // ];

  tweets = [
    { id: '1666470998160318467' },
    { id: '1696415151652581462' },
    { id: '1666172485581012992' },
    { id: '1674140683450593280' },
    { id: '1664341518524489737' },
    { id: '1706743656965980444' },

    { id: '1670193962068353025' },
    // { id: '1733188226511212928' },
    { id: '1706722987796238615' },
    { id: '1688216939456319488' },
    // { id: '1712580270853857659' },
    { id: '1644885090588147712' },


    // { id: '1712444960606204063' },
    { id: '1712128027767746638' },
    { id: '1706805591581340028' },
    // { id: '1696565523981521023' },
    // { id: '1671886516908609539' },
    { id: '1671881993104297989' },

  ];



}
























