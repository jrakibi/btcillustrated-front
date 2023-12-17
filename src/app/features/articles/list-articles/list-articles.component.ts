import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/core/model/article-model';
import { ArticleService } from 'src/app/core/service/article-service';
import { TweenLite } from 'gsap';
import { LoadingService } from 'src/app/core/service/laoding-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css', './../../mission/mission.component.css']
})
export class ListArticlesComponent implements OnInit {

  isLogoClicked = false;
  activeLink: string = '';
  articles: Article[] = []; // Array to store the articles
  illustrations: any[] = []; // Array to store the illustrations
  groupedArticles: Article[][]; // Array of article arrays

  constructor(private http: HttpClient, 
    private articleService: ArticleService,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.getArticles()  
  }



  getArticles() {
    this.articleService.getArticles().subscribe(articles => {
      this.loadingService.show();
      this.articles = articles
      this.groupedArticles = this.groupArticles(this.articles);

    })
  }


  groupArticles(articles: Article[]): Article[][] {
    let groupedArticles = [];
    for (let i = 0; i < articles.length; i += 3) {
      groupedArticles.push(articles.slice(i, i + 3));
    }
    return groupedArticles;
  }

  getArticleDescription(content: string): SafeHtml {
    const slicedContent = `${content.slice(0, 150)}...`;
    return this.sanitizer.bypassSecurityTrustHtml(slicedContent);
  }
}
