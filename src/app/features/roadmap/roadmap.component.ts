// illustration.component.ts
import { Component } from '@angular/core';
import { HeaderLink, HeaderOptions } from 'src/app/shared/header/header-options';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent {
  show: boolean = true
  openDialog() {
    this.show = !this.show
  }

  openElementDialog() {
    
  }
}
