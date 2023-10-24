import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/core/model/article-model';
import { ArticleService } from 'src/app/core/service/article-service';
import { TweenLite } from 'gsap';
import { LoadingService } from 'src/app/core/service/laoding-service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  isLogoClicked = false;
  activeLink: string = '';
  articles: Article[] = []; // Array to store the articles
  illustrations: any[] = []; // Array to store the illustrations

  constructor(private http: HttpClient, 
    private articleService: ArticleService,
    private loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.getArticles()  
  }



  getArticles() {
    this.articleService.getArticles().subscribe(articles => {
      this.loadingService.show();
      this.articles = articles
    })
  }



}
