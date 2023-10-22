import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/core/service/article-service';
import { IllustrationService } from 'src/app/core/service/illustration-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cards = [
    { icon: 'assets/icons/visual.png', text: 'Visuals', link: '/search' },
    { icon: 'assets/icons/feed.svg', text: 'MailMerge', link: '/mailing-list' },
    { icon: 'assets/icons/roadmap.png', text: 'RoadMap', link: '/roadmap' },
    { icon: 'assets/icons/blog.svg', text: 'Blog', link: '/list"' },
    { icon: 'assets/icons/terminal.png', text: 'Plateform', link: '' }
];

}
