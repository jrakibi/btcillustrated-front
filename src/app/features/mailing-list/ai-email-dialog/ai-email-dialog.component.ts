import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogueResponse } from 'src/app/core/model/ai-interfaces';
import { Topic } from 'src/app/core/model/daily-update-model';
import { OpenaiService } from 'src/app/core/service/open-ai.service';

@Component({
  selector: 'app-ai-email-dialog',
  templateUrl: './ai-email-dialog.component.html',
  styleUrls: ['./ai-email-dialog.component.scss']
})
export class AiEmailDialogComponent implements OnInit {
  topic: Topic | null = null;
  isLoading: boolean = true
  emailContent: string = ""
  dialogueResponse: DialogueResponse | null = null;

  constructor(private openaiService: OpenaiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    debugger
    this.emailContent = this.data.emailContent
    this.topic = this.data.topic
    this.submitEmailContent(this.emailContent);


    this.dialogueResponse =
    {
      "keywords": [
        "SeedHammer",
        "output descriptor",
        "metal engraved backups",
        "PSBT binary encoding",
        "consensus",
        "adoption",
        "BIP174",
        "PSBT_GLOBAL_XPUB",
        "BIPs 380-386",
        "BIP 389",
        "wallet-policies format",
        "Miniscript",
        "CBOR",
        "PSBT encoding",
        "Blockchain Commons",
        "header",
        "magic number",
        "Bitcoin Improvement Proposal (BIP)\n"
      ],
      "dialogue": [
        {
          "speaker": "Author",
          "text": "Hey there! I wanted to share some exciting news about SeedHammer's latest project. We're developing a standard output descriptor that will allow for self-contained metal engraved backups."
        },
        {
          "speaker": "Me",
          "text": "That sounds interesting! Can you explain what an output descriptor is?"
        },
        {
          "speaker": "Author",
          "text": "Of course! An output descriptor is a way to represent Bitcoin addresses and their associated"
        }
      ]
    }
  }

  submitEmailContent(emailContent: string): void {
    this.openaiService.emailToDialogue(emailContent).subscribe({
      next: (response) => {
        debugger
        this.isLoading = false
        this.dialogueResponse = response;
      },
      error: (err) => {
        debugger
        this.isLoading = false
        console.error('Error fetching dialogue:', err);
      }
    });
  }



  



}
