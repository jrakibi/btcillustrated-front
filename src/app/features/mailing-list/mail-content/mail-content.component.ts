import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/core/model/daily-update-model';
import { MailingListService } from 'src/app/core/service/mailing-list-service';

@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css']
})
export class MailContentComponent implements OnInit {

  topic: Topic;

  constructor(private xmlService: MailingListService) {}

  ngOnInit() {
    debugger
    this.xmlService.fetchXmlData('static/bitcoin-dev/Oct_2022/combined_Refreshed-BIP324.xml')
      .subscribe((data: any) => {
        debugger
        this.topic = data;
      });
  }

}
