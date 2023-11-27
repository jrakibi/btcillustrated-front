import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/core/service/article-service';
import { IllustrationService } from 'src/app/core/service/illustration-service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/core/service/search-service';
import { SearchResultModel } from 'src/app/core/model/search-result-model';
import { Illustration } from 'src/app/core/model/illustration-model';
import { LoadingService } from 'src/app/core/service/laoding-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  illustrations: SearchResultModel[] = []
  allIllsutrations: SearchResultModel[] = []
  thumbnailLoaded?: boolean;

  
  constructor(
    private router: Router,
    private searchService: SearchService,
    private illustrationService: IllustrationService,
    private loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.illustrationService.getIllustrations().subscribe((illustrations: Illustration[]) => {
      
      this.loadingService.hide();

      this.illustrations = illustrations.map(illustration => ({
        id: illustration.id,
        title: illustration.title,
        thumbnailImage: illustration.thumbnailImage,
        snippet: illustration?.details?.substring(0, 100) + '...',
        thumbnailLoaded: false
    }));
    
      // this.illustrations = illustrations.map(illustration => ({
      //     id: illustration.id,
      //     title: illustration.title,
      //     thumbnailImage: illustration.thumbnailImage,
      //     snippet: illustration?.details?.substring(0, 100) + '...' // assuming you want the first 100 chars of details followed by '...'
      //     // ... map other properties ...
      // }));

      this.allIllsutrations = this.illustrations
    });
  }
  navigateHome() {
    this.router.navigateByUrl('/home');
  }

  onSearch(query: string) {
    
    if (query) {
      this.searchService.search(query).subscribe(data => {
        
        this.illustrations = data;
      });
    } else {
      this.illustrations = this.allIllsutrations
    }
  }

  onLoadImage(illustration: any) {
    
    illustration.thumbnailLoaded = true;
}

}
