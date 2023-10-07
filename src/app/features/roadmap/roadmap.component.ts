// illustration.component.ts
import { Component } from '@angular/core';
import { HeaderLink, HeaderOptions } from 'src/app/shared/header/header-options';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesRightDialogComponent } from './resources-right-dialog/resources-right-dialog.component';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent {
  show: boolean = true
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ResourcesRightDialogComponent, {
      width: '30%',
      height: '100%',
      panelClass: 'right-dialog-container',
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


  
}
