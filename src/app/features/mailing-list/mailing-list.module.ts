import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailingListRoutingModule } from './mailing-list.routing.module';
import { DailyUpdateDialogComponent } from './daily-update-dialog/daily-update-dialog.component';
import { MailContentComponent } from './mail-content/mail-content.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailingListComponent } from './mailing-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TruncatePipe } from 'src/app/core/pipe/truncate-pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ExtractNamePipe } from 'src/app/core/pipe/extra-name-pipe';



@NgModule({
  declarations: [
    MailingListComponent,
      MailContentComponent,
      MailListComponent,
      DailyUpdateDialogComponent,


      TruncatePipe,
      ExtractNamePipe
  ],
  imports: [
    CommonModule,
    MailingListRoutingModule,
    SharedModule,

    MatDialogModule
  ]
})
export class MailingListModule { }