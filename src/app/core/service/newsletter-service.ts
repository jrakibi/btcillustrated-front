import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private API_ENDPOINT = `${environment.apiUrl}/newsletter/subscribe`;

  constructor(private http: HttpClient) { }

  subscribeToNewsletter(email: string): Observable<any> {
    return this.http.post(this.API_ENDPOINT, email);
  }
}