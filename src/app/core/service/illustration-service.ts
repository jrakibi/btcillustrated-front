import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Illustration } from '../model/illustration-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  private apiUrl = `${environment.apiUrl}/illustrations`;

  constructor(private http: HttpClient) { }

  getIllustrations(): Observable<Illustration[]> {
    return this.http.get<Illustration[]>(this.apiUrl);
  }

  getIllustration(id: string): Observable<Illustration> {
    return this.http.get<Illustration>(`${this.apiUrl}/${id}`);
  }

  createIllustration(illustration: any): Observable<any> {
    return this.http.post(this.apiUrl, illustration);
  }
}
