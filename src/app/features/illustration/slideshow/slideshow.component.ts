// illustration.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IllustrationService } from 'src/app/core/service/illustration-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Illustration } from 'src/app/core/model/illustration-model';
import { HeaderLink, HeaderOptions } from 'src/app/shared/header/header-options';
import { OpenaiService } from 'src/app/core/service/open-ai.service';
import { MatDialog } from '@angular/material/dialog';
import { LnurlPayDialogComponent } from 'src/app/features/illustration/lnurl-pay-dialog/lnurl-pay-dialog.component';
import { IllustrationGptComponent } from '../illustration-gpt/illustration-gpt.component';
declare var $: any; // Import jQuery

@Component({
  selector: 'app-slide-show',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideShowComponent {
  showCollection: boolean = false;
  currentImageIndex: number = 0;
  showGPTInput = false;

  imageCollection: any[]
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

  constructor(private route: ActivatedRoute,
    private openaiService: OpenaiService,
    public dialog: MatDialog) {
    const data = this.route.snapshot.data['data'];
    this.illustrations = data
  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.illustration = this.illustrations.filter(illustration => illustration.id == id)[0]
      this.imageCollection = this.illustration.imagePaths.map(imgSrc => ({
        src: imgSrc,
        alt: 'Chocheng Fall 2023 Collection Image',
        loaded: false
      }));
    }
    
    let headerLinks: HeaderLink[] = [
      {
        title: 'RESOURCES',
        route: '/illustration/' + id + '/resources'
      },
      {
        title: 'ILLUSTRATIONS',
        route: '/illustration/' + id + '/slides'
      },
      {
        title: 'GPT',
        route: '/illustration/' + id + '/gpt'
      },

    ]
    this.headerOptions = {
      isUnderlineDisplayed: true,
      isSlideShow: true,
      headerLinks: headerLinks,
      isDarkMode: true
    }
  }

  headerOptions: HeaderOptions


  showModal: boolean = false;
  gptQuestion: string = '';
  gptResponse: string = '';
  toggleModal() {
    this.showModal = !this.showModal;
  }

  isLoading: boolean = false;

  askGPT() {
    this.isLoading = true;
    debugger
    this.openaiService.askGPT(this.gptQuestion).subscribe(
      (responseText: string) => { // Explicitly type the response
        this.gptResponse = responseText;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error asking GPT:', error.message);
        console.error('Full Error:', error);
        this.isLoading = false;
      }
    );
  }

  toggleGPT() {
    this.showGPTInput = !this.showGPTInput;
  }

  onLoadImage(image: any) {
    
    image.loaded = true
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LnurlPayDialogComponent, 

      );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openGptDialog() {
    const dialogRef = this.dialog.open(IllustrationGptComponent, { 
      // width: '900px',
      height: '500px',
      panelClass: 'black-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
