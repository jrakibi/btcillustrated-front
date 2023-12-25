import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultModel } from '../model/search-result-model';
import { environment } from 'src/environments/environment';
import { Category, Illustration } from '../model/illustration-model';
import { MindMapperResponse } from '../model/ai-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppContext {
  private apiUrl = `${environment.apiUrl}/categories`;
  private mindMapperData: MindMapperResponse | null = null;

  constructor(private http: HttpClient) { }


  // Method to store data
  storeMindMapperData(data: MindMapperResponse) {
    this.mindMapperData = data;
  }

  // Method to retrieve data
  retrieveMindMapperData(): MindMapperResponse | null {
    return this.mindMapperData;
  }
}