// illustration.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderLink, HeaderOptions } from 'src/app/shared/header/header-options';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesRightDialogComponent } from './resources-right-dialog/resources-right-dialog.component';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {
  show: boolean = true
  headerOptions: HeaderOptions

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.headerOptions = {
      isUnderlineDisplayed: true,
      isDarkMode: false
    }
  }

  openDialog() {
    this.dialog.open(ResourcesRightDialogComponent, {
      width: '30%',
      height: '100%',
      panelClass: 'right-dialog-container',
      position: {
        right: '0',
        top: '0'
      },
      hasBackdrop: true
    });
  }

  openElementDialog() {
    this.dialog.open(ResourcesRightDialogComponent, {
      width: '30%',
      height: '100%',
      panelClass: 'right-dialog-container',
      hasBackdrop: true,
      position: {
        right: '0',
        top: '0'
      }
    });
  }


  // public isScrolled = false;

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(event: Event): void {
  //   const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   this.isScrolled = scrollPosition > 50;
  // }

  public isScrolled = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   this.isScrolled = window.scrollY > 50;  // You can adjust this value based on when you want the transition to start
  // }
  @HostListener('window:scroll', [])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 150; /* Adjust this as per your requirement */
  }

  openLinkInNewTab(link: string): void {
    window.open(link, '_blank');
  }

}
