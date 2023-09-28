import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/core/service/article-service';
import { IllustrationService } from 'src/app/core/service/bips-service';
import { HeaderOptions } from './header-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() headerOptions: HeaderOptions
  isLogoClicked = false;
  activeLink: string = '';
  articles: any[] = []; // Array to store the articles
  illustrations: any[] = []; // Array to store the illustrations
  isCardContainerClicked: boolean = false;

  constructor(private http: HttpClient, 
    private articleService: ArticleService,
    private illustrationService: IllustrationService,
    ) { }

  toggleCardContainer() {
    this.isCardContainerClicked = !this.isCardContainerClicked;
    this.isLogoClicked = !this.isLogoClicked;
  }


  setActiveLink(link: string) {
    this.isLogoClicked = true;
    this.activeLink = link;
    if (link === 'Article') {
      this.getArticles(); 
    }
    if (link === 'illustration') {
      this.getIllustrations(); 
    }
    if (link === 'Bips') {
      this.getIllustrations(); 
    }
  }

  getArticles() {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles
    })
  }

  getIllustrations() {
    this.illustrationService.getIllustrations().subscribe(illustrations => {
      this.illustrations = illustrations
    })
  }
}
