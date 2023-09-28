import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/core/service/article-service';
import { IllustrationService } from 'src/app/core/service/illustration-service';
import { HeaderOptions } from 'src/app/shared/header/header-options';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  isLogoClicked = false;
  activeLink: string = '';
  articles: any[] = []; // Array to store the articles
  illustrations: any[] = []; // Array to store the illustrations
  headerOptions: HeaderOptions
  constructor(private http: HttpClient, 
    private articleService: ArticleService,
    private illustrationService: IllustrationService,
    ) { }

  ngOnInit(): void {
    this.headerOptions = {
      isUnderlineDisplayed: true,
    }
  }

}
