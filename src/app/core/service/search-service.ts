import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultModel } from '../model/search-result-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) { }

  search(query: string): Observable<SearchResultModel[]> {
    return this.http.get<SearchResultModel[]>(`${this.apiUrl}?searchTerm=${query}`);
  }
}
