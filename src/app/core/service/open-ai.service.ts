import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private baseUrl: string = `${environment.apiUrl}/openai`;

  constructor(private http: HttpClient) {}


  askGPT(question: string): Observable<string> {
    const url = `${this.baseUrl}/chat?prompt=${question}`;
    return this.http.get(url, { responseType: 'text' }); // Expecting text
  }
  
  
}
