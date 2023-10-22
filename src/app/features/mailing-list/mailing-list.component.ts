import { Component, OnInit } from '@angular/core';
import { DailyUpdateData } from 'src/app/core/model/daily-update-model';
import { MailingListService } from 'src/app/core/service/mailing-list-service';
import { HeaderOptions } from 'src/app/shared/header/header-options';

@Component({
  selector: 'app-mailing-list',
  templateUrl: './mailing-list.component.html',
  styleUrls: ['./mailing-list.component.css']
})
export class MailingListComponent implements OnInit {
  headerOptions: HeaderOptions
  constructor(
  ) { }


  ngOnInit(): void {
    this.headerOptions = {
      isUnderlineDisplayed: true,
    }
  }
}