import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailingListComponent } from './mailing-list.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailContentComponent } from './mail-content/mail-content.component';

const routes: Routes = [
  {
    path: '',
    component: MailingListComponent,
    children: [
      {
        path: '',
        component: MailListComponent,
        pathMatch: 'full'
      },
      {
        path: ':filePath',
        component: MailContentComponent,
      },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailingListRoutingModule { }