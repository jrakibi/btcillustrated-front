import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BTC Illustrated';
  isMobile: boolean = false;
  showMobileWarning: boolean = true;
  showHeader = true;

  ngOnInit() {
    this.checkDeviceSize();
  }

  checkDeviceSize() {
    const mobileBreakpoint = 768; // You can adjust this value
    this.isMobile = window.innerWidth < mobileBreakpoint;
    this.showMobileWarning = this.isMobile; // Show warning initially only on mobile
  }

  continueAnyway() {
    this.showMobileWarning = false; // Hide mobile warning and show platform content
  }

  hideHeader() {
    this.showHeader = false;
  }
}
