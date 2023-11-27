import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultModel } from '../model/search-result-model';
import { environment } from 'src/environments/environment';
import { Illustration, Tag } from '../model/illustration-model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) { }

  getTagsWithCounts(): Observable<{ [key: string]: number }> {
    
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/counts`);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }
}