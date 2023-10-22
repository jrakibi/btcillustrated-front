import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoadmapComponent } from './roadmap.component';
import { RoadmapRoutingModule } from './roadmap.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResourcesRightDialogComponent } from './resources-right-dialog/resources-right-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    RoadmapComponent,
    ResourcesRightDialogComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    RoadmapRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MatIconModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoadmapModule { }
