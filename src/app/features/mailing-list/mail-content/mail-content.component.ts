import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/core/model/daily-update-model';
import { MailingListService } from 'src/app/core/service/mailing-list-service';
import { AiEmailDialogComponent } from '../ai-email-dialog/ai-email-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserTypeDialogComponent } from '../user-type-dialog/user-type-dialog.component';

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
    private dialog: MatDialog,
    // public dialogRef: MatDialogRef<AiEmailDialogComponent>,
    private route: ActivatedRoute) {}

  ngOnInit() {
    
    this.filePath = this.route.snapshot.paramMap.get('filePath')
    this.xmlService.fetchXmlData(this.filePath)
      .subscribe((data: any) => {
        
        this.topic = data;
      });
  }

  // onExplainClick() {
  //   let emailContent = ""
  //   const dialogRef = this.dialog.open(AiEmailDialogComponent, 
  //     { 
  //       width: '70%',
  //       height: '60%',
  //       data: { 
  //         emailContent: emailContent
  //       }
  //     });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //   });
  // }


  // Assuming you have a currentTopic variable of type Topic which is the topic being displayed
currentTopic: Topic | null = null;

onExplainClickBackup() {
  this.currentTopic = this.topic
  // Check if the topic and the entries array are not null or undefined
  if (this.currentTopic && this.currentTopic.entries && this.currentTopic.entries.length > 0) {
    // Get the summary of the first entry in the topic
    let emailContent = this.currentTopic.entries[0].summary;

    // Open the dialog with the extracted email content
    this.dialog.open(AiEmailDialogComponent, {
      width: '70%',
      height: '60%',
      data: { 
        topic: this.currentTopic,
        emailContent: emailContent 
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    //   // If there is a result and it's not a cancellation, send the content to the GPT AI
    // });
  } else {
    // Handle the case where there is no content to send for explanation
    console.error('No email content to send to the AI.');
  }
}

onExplainClick() {
  this.currentTopic = this.topic
  // Check if the topic and the entries array are not null or undefined
  if (this.currentTopic && this.currentTopic.entries && this.currentTopic.entries.length > 0) {
    // Get the summary of the first entry in the topic
    let emailContent = this.currentTopic.entries[0].summary;

    // Open the dialog with the extracted email content
    this.dialog.open(UserTypeDialogComponent, {
      width: '70%',
      height: '60%',
      data: { 
        topic: this.currentTopic,
        emailContent: emailContent 
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    //   // If there is a result and it's not a cancellation, send the content to the GPT AI
    // });
  } else {
    // Handle the case where there is no content to send for explanation
    console.error('No email content to send to the AI.');
  }
}

}
