import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private API_ENDPOINT = 'YOUR_API_ENDPOINT';

  constructor(private http: HttpClient) { }

  subscribeToNewsletter(email: string): Observable<any> {
    return this.http.post(this.API_ENDPOINT, { email });
  }
}
