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
import { CommonModule, DatePipe } from '@angular/common';
import { SearchComponent } from './features/search/search.component';
import { LayoutMenuComponent } from './shared/layout-menu/layout-menu.component';
import { ListArticlesComponent } from './features/articles/list-articles/list-articles.component';
import { TestComponent } from './test/test.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './features/about/about.component';
import { NewsletterComponent } from './features/newsletter/newsletter.component';
import { SupportComponent } from './features/support/support.component';

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
    AboutComponent,
    NewsletterComponent,
    SupportComponent,

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
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
