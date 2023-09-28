import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IllustrationComponent } from './illustration.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { SlideShowComponent } from './slideshow/slideshow.component';
import { IllustrationRoutingModule } from './illustration.routing.module';
import { IllustrationListComponent } from './illustration-list/illustration-list.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IllustrationResourcesComponent } from './illustration-resources/illustration-resources.component';
import { IllustrationGptComponent } from './illustration-gpt/illustration-gpt.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    IllustrationComponent,
    SlideShowComponent,
    IllustrationListComponent,
    IllustrationResourcesComponent,
    IllustrationGptComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    IllustrationRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IllustrationModule { }
