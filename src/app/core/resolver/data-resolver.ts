import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IllustrationService } from '../service/illustration-service';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<any> {
  constructor(private illustrationService: IllustrationService) {}

  resolve(): Observable<any> {
    return this.illustrationService.getIllustrations(); // Replace with your data fetching logic
  }
}
