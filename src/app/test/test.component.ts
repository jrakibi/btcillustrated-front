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
  headerOptions: HeaderOptions
  showCollection: boolean = false;
  currentImageIndex: number = 0;

  imageCollection: any
  toggleCollection() {
    this.showCollection = !this.showCollection;
  }

  scrollImages(direction: 'left' | 'right') {
    const imageList = document.querySelector('.image-list');
  
    if (direction === 'left') {
      imageList.scrollBy({ left: -100, behavior: 'smooth' }); // Change the number to control the scroll amount
    } else {
      imageList.scrollBy({ left: 100, behavior: 'smooth' }); // Change the number to control the scroll amount
    }
  }


  selectImage(index: number) {
    this.currentImageIndex = index;
  }
  
  previousImage() {
    this.fadeOutImage(() => {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.imageCollection.length) % this.imageCollection.length;
    });
}

nextImage() {
    this.fadeOutImage(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageCollection.length;
    });
}

fadeOutImage(callback: Function) {
  const imageWrapper = document.querySelector('.image-wrapper');
  if (imageWrapper) {
      (imageWrapper as HTMLElement).style.opacity = '0';
      setTimeout(() => {
          callback();
          setTimeout(() => {
              (imageWrapper as HTMLElement).style.opacity = '1';
          });
      }, 250);  // delay should match the transition duration
  } else {
      callback();
  }
}







  illustrations: any[] = []
  illustration: Illustration

  constructor(private route: ActivatedRoute,) { 
      const data = this.route.snapshot.data['data'];
      this.illustrations = data
    }

  ngOnInit(): void {
  //   document.addEventListener('DOMContentLoaded', function() {
  //     const modalContainer = document.querySelector('.modal-container');
  //     const closeBtn = document.querySelector('.close-btn');
  
  //     closeBtn.addEventListener('click', function() {
  //         modalContainer.classList.remove('active');
  //     });
  // });
    const id = this.route.snapshot.paramMap.get('id'); 
    this.headerOptions = {
      isUnderlineDisplayed: true,
      isSlideShow: true
    }
    if (id) {
      this.illustration = this.illustrations.filter(illustration => illustration.id == id)[0]
      this.imageCollection = this.illustration.imagePaths.map(imgSrc => ({
        src: imgSrc,
        alt: 'Chocheng Fall 2023 Collection Image'
      }));
    } 
  }
  
}