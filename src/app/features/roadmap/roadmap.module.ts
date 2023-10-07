import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoadmapComponent } from './roadmap.component';
import { RoadmapRoutingModule } from './roadmap.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RoadmapComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    RoadmapRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoadmapModule { }
