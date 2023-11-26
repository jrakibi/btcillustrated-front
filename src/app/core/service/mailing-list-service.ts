import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Illustration } from '../model/illustration-model';
import { environment } from 'src/environments/environment';
import { DailyUpdateData } from '../model/daily-update-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailingListService {
  // private jsonUrl = `${environment.mailingListRepo}/homepage.json`;
  private jsonUrl = "https://raw.githubusercontent.com/bitcoinsearch/mailing-list-summaries/main/static/homepage.json"
  private mailUrl = "https://raw.githubusercontent.com/bitcoinsearch/mailing-list-summaries/main"
  constructor(private http: HttpClient) { }

  getDailyUpdate(): Observable<DailyUpdateData> {
    return this.http.get<DailyUpdateData>(this.jsonUrl);
  }


  fetchXmlData(topicUrl: string) {
    return this.http.get(`${this.mailUrl}/${topicUrl}`, { responseType: 'text' }).pipe(
        map((xmlString: string) => {
          
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            // Extract properties from XML using DOM methods
            const feed = xmlDoc.querySelector('feed');
            const title = feed.querySelector('title').textContent;
            const updated = feed.querySelector('updated').textContent;

            const authorName = feed.querySelector('author > name').textContent;

            const entries = Array.from(feed.querySelectorAll('entry')).map(entry => ({
                id: entry.querySelector('id').textContent,
                title: entry.querySelector('title').textContent,
                updated: entry.querySelector('updated').textContent,
                link: entry.querySelector('link').getAttribute('href'),
                summary: entry.querySelector('summary').textContent,
                published: entry.querySelector('published').textContent,
            }));

            return {
                id: feed.querySelector('id').textContent,
                title,
                updated,
                authorName,
                entries
            };
        })
    );
}


}

