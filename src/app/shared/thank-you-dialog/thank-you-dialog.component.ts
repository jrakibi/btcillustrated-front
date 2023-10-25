import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-thank-you-dialog',
  templateUrl: './thank-you-dialog.component.html',
  styleUrls: ['./thank-you-dialog.component.css']
})
export class ThankYouDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ThankYouDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
