import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewsletterService } from 'src/app/core/service/newsletter-service';
import { ThankYouDialogComponent } from 'src/app/shared/thank-you-dialog/thank-you-dialog.component';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  
  showThankYouModal: boolean = false;


  public emailForm: FormGroup;

constructor(
  private fb: FormBuilder, 
  private newsletterService: NewsletterService,
  public dialog: MatDialog) {
  this.emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
}

subscribe(): void {
  if (this.emailForm.valid) {
      // using the value from the email form group control
      let email = this.emailForm.get('email').value
      this.newsletterService.subscribeToNewsletter(email).subscribe(
          response => {
              this.emailForm.reset(); // Clear the input
              this.openDialog();
            },
          error => {
              console.error('There was an error!', error);
          }
      );
  } else {
      alert("Please enter a valid email address.");
  }
}


  ngOnInit(): void {
    
  }


  hideModal() {
    this.showThankYouModal = false;
  }
  close() {
    this.closeEvent.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ThankYouDialogComponent, {
      panelClass: 'thank-you-dialog' // this is the custom class
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
