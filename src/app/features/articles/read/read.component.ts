import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { ArticleService } from 'src/app/core/service/article-service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  @ViewChild('editor', { static: false }) editorElementRef: ElementRef;
  quill: Quill;
  selectedArticleTitle: string = '';
  singleArticleVisible: boolean = false;
  articleContent: any;
  articleTitles = ["View all articles..."];
  fullListVisible: boolean = false;
  articles: any[] = []
  readingTime: number;

  constructor(
    private articleService: ArticleService, 
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    if (id) {
      this.articleService.getArticle(id).subscribe(article => {
        this.selectedArticleTitle = article.title;
        this.articleContent = article.content;
        this.articles = [article]
        this.singleArticleVisible = true
        this.readingTime = this.estimateReadingTime(this.articleContent);
      });
    } else {
      this.articleService.getArticles().subscribe(articles => {
        this.articles = articles;
        this.articleTitles = articles.map(article => article.title);
      });
    }
  }

  estimateReadingTime(htmlContent: string): number {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const words = doc.body.textContent?.trim().split(/\s+/g) || [];
    
    // Calculate reading time based on average reading speed (considering 250 words per minute)
    const readingTime = Math.ceil(words.length / 250);
    
    return readingTime;
  }
  showHeartGif: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.pageYOffset;
    const scrollTrigger = 200; // px after which the GIF will be shown

    if (yOffset > scrollTrigger) {
      this.showHeartGif = true;
    } else {
      this.showHeartGif = false;
    }
  }
}

