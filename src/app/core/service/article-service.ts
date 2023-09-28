// article.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getArticle(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${title}`);
  }

  createArticle(article: any): Observable<any> {
    
    return this.http.post(this.apiUrl, article);
  }
}
