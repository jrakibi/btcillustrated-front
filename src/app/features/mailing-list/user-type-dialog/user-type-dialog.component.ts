import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogueResponse } from 'src/app/core/model/ai-interfaces';
import { Topic } from 'src/app/core/model/daily-update-model';
import { OpenaiService } from 'src/app/core/service/open-ai.service';
import { AiEmailDialogComponent } from '../ai-email-dialog/ai-email-dialog.component';

@Component({
  selector: 'app-user-type-dialog',
  templateUrl: './user-type-dialog.component.html',
  styleUrls: ['./user-type-dialog.component.css']
})
export class UserTypeDialogComponent implements OnInit {
  emailContent: string = ""
  topic: Topic | null = null;

  constructor(private openaiService: OpenaiService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.emailContent = this.data.emailContent
    this.topic = this.data.topic
  }



  openAIEmailDialog(userType) {
    // Check if the topic and the entries array are not null or undefined
    if (this.topic && this.topic.entries && this.topic.entries.length > 0) {
      // Get the summary of the first entry in the topic
      let emailContent = this.topic.entries[0].summary;
  
      // Open the dialog with the extracted email content
      this.dialog.open(AiEmailDialogComponent, {
        panelClass: 'full-screen-dialog-dark',
        data: { 
          topic: this.topic,
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
