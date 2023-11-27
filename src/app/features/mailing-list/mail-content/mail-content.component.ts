import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/core/model/daily-update-model';
import { MailingListService } from 'src/app/core/service/mailing-list-service';

@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css']
})
export class MailContentComponent implements OnInit {

  topic: Topic;
  filePath: string
  constructor(
    private xmlService: MailingListService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.filePath = this.route.snapshot.paramMap.get('filePath')
    this.xmlService.fetchXmlData(this.filePath)
      .subscribe((data: any) => {
        
        this.topic = data;
      });
  }

}
