import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Illustration } from '../model/illustration-model';
import { environment } from 'src/environments/environment';
import { LoadingService } from './laoding-service';

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  private apiUrl = `${environment.apiUrl}/illustrations`;

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getIllustrations(): Observable<Illustration[]> {
    this.loadingService.show();
    return this.http.get<Illustration[]>(this.apiUrl);
  }

  getIllustration(id: number): Observable<Illustration> {
    this.loadingService.show();
    return this.http.get<Illustration>(`${this.apiUrl}/${id}`);
  }

  createIllustration(illustration: any): Observable<any> {
    return this.http.post(this.apiUrl, illustration);
  }

  updateIllustration(illustrationId: number, illustrationData: Illustration) {
    return this.http.put<Illustration>(`${this.apiUrl}/${illustrationId}`, illustrationData);
  }
}
