import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/core/service/article-service';
import { IllustrationService } from 'src/app/core/service/illustration-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogoClicked = false;
  activeLink: string = '';
  articles: any[] = []; // Array to store the articles
  illustrations: any[] = []; // Array to store the illustrations

  constructor(private http: HttpClient, 
    private articleService: ArticleService,
    private illustrationService: IllustrationService,
    ) { }

  toggleLogoClick() {
    this.isLogoClicked = !this.isLogoClicked;
  }

  setActiveLink(link: string) {
    this.isLogoClicked = true;
    this.activeLink = link;
    if (link === 'Article') {
      this.getArticles(); 
    }
    if (link === 'Illustrations') {
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
