import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { WriteComponent } from './features/articles/write/write.component';
import { ReadComponent } from './features/articles/read/read.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './features/search/search.component';
import { LayoutMenuComponent } from './shared/layout-menu/layout-menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { ListArticlesComponent } from './features/articles/list-articles/list-articles.component';
import { TestComponent } from './test/test.component';
import { SlideShowComponent } from './features/illustration/slideshow/slideshow.component';
import { IllustrationComponent } from './features/illustration/illustration.component';
import { IllustrationRoutingModule } from './features/illustration/illustration.routing.module';
import { IllustrationListComponent } from './features/illustration/illustration-list/illustration-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { IllustrationResourcesComponent } from './features/illustration/illustration-resources/illustration-resources.component';
import { IllustrationGptComponent } from './features/illustration/illustration-gpt/illustration-gpt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './features/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WriteComponent,
    ReadComponent,
    SearchComponent,
    LayoutMenuComponent,
    ListArticlesComponent,
    TestComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
