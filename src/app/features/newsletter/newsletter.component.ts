import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewsletterService } from 'src/app/core/service/newsletter-service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  
  email: string = '';
  showThankYouModal: boolean = false;

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit(): void {
    
  }

  subscribe() {
    this.newsletterService.subscribeToNewsletter(this.email).subscribe(
      response => {
        this.email = ''; // Clear the input
        this.showThankYouModal = true; // Show the thank you modal
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  hideModal() {
    this.showThankYouModal = false;
  }
  close() {
    this.closeEvent.emit();
  }
}
