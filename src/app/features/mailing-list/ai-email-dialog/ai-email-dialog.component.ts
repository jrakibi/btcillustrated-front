import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogueResponse } from 'src/app/core/model/ai-interfaces';
import { Topic } from 'src/app/core/model/daily-update-model';
import { OpenaiService } from 'src/app/core/service/open-ai.service';
import { animate, style, transition, trigger, sequence } from '@angular/animations';

@Component({
  selector: 'app-ai-email-dialog',
  templateUrl: './ai-email-dialog.component.html',
  styleUrls: ['./ai-email-dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AiEmailDialogComponent implements OnInit {
  topic: Topic | null = null;
  isLoading: boolean = true
  emailContent: string = ""
  dialogueResponse: DialogueResponse | null = null;

  currentDialogueIndex: number = 0;
  currentText: string = '';
  typingCompleted = new Subject<void>();
  typingSpeed = 0.3; // milliseconds per character
  currentTexts: string[] = []; // This will hold the text for all messages



  constructor(private openaiService: OpenaiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    debugger
    this.emailContent = this.data.emailContent
    this.topic = this.data.topic
    this.submitEmailContent(this.emailContent);

    this.startLoadingProcess();

  }

  submitEmailContent(emailContent: string): void {
    this.openaiService.emailToDialogue(emailContent).subscribe({
      next: (response) => {
        debugger
        this.isLoading = false
        this.dialogueResponse = response;
    this.dialogueResponse?.dialogue.forEach(() => this.currentTexts.push('')); // Initialize with empty strings

    this.startTypingEffect();

      },
      error: (err) => {
        debugger
        this.isLoading = false
        console.error('Error fetching dialogue:', err);
      }
    });
  }

  startTypingEffect() {
    if (!this.dialogueResponse || this.currentDialogueIndex >= this.dialogueResponse.dialogue.length) {
      return;
    }

    const currentDialogue = this.dialogueResponse.dialogue[this.currentDialogueIndex];
    let charIndex = 0; // Current character index

    const typingInterval = setInterval(() => {
      this.currentTexts[this.currentDialogueIndex] += currentDialogue.text[charIndex];
      charIndex++;

      if (charIndex === currentDialogue.text.length) {
        clearInterval(typingInterval);
        this.currentDialogueIndex++; // Move to the next message

        if (this.currentDialogueIndex < this.dialogueResponse.dialogue.length) {
          setTimeout(() => this.startTypingEffect(), 1000); // Delay before starting the next message
        }
      }
    }, this.typingSpeed);
  }


  getImageSource(speaker: string) {
    let imgSrc = ""
    if (speaker == "Author") {
      imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECklEQVR4nO2Za4gWZRTHn61NctfFNhIp80OmFua1zawPJQRFqKAhmlcsv5W1SJAQIgURIUQblpfAsvoQkYiIIomgQWZgoqKGdsPoiqWiFStbuj857H/ZcZzZeeZ9Zt59Bf+w7MvMOf/zPzPP5ZxnnLsG54B64H7gBeBD4EvgV+AMcAG4qN9/APuAjcArwBRgYJ8/Q+ABYB1wmsrRAXwGLAT6VTuBh4DdMUFHgbXA08DDwO1AM3A9UKfftwKTgNnA68AuJdINe2OtwA1lJzAQWA90KvBfwKvAXQGcNwGLgK9jD2Vcsep7At4NHFegdmA50FhwjMeBY4px3oabKzjA+Mg8OAAMLzTA5bFuBFYrlr35JUURj9AQMmwGGgohzo7bqkRsxZsZSjYAOKIktlV7VQFeVOx/gDtDiFaJ6BugqVCV/ho+lobPKyVo0Wb2HzC2cIX+OpqBP5VM/iGmoWR4oxSFlQ2xQ3kdx0TG5i2lKfTX0wiclKbJeRzflNM7rkYAvCxNb/s6WDnxm5zuK1CIlTRfBfiPkaZfTKOPw7huh0qDJnAOE+fJQJ4fxDPRx/g5Gb8fEjTGOUecWwN5VonneR/j92T8bI4A84BzwNSU+23iXBG7Pk1+8zzjLBbPeh/jL2T8iCf5KOBf+UxPsdmr+4/Frk/XdfMf5RFrouz3+Qj7ScZjPZdFK7kNG1Js+qmStbqpOeH+BvkfzaqmgQbVXtbD3JElzvYOwxCPRKIiGjKe4rGU+/1to/Odl3S10oZNWYb/y7B/ht1cn2FhZbjsPujFZiTwt+yeyog7WPPqiqEaN2wvOJGPshaPPIkYgJcixWy9SwLws4yGJhrkH1rfyqaliKEVmXffySe58QIOymBCokGOya7KtVOTPbGXyTPZU1a8U8DNSQbWBRrmu8Dl18awru9N8Z2RZ/mNA9iZWhNGSuY1Lv+GOCV2fYW42lL8cm2IcQD3aHGyv9Hxmw92v2oXCCtJxDUnlMujbPkkaSJ1n5gEnS1FeohhITwehyOGE73VRqtdAHQGvCeEozfYcNJxq2FH2gRG43eQqzHQlcCnKlfQcdX4rJ79XVdD4PIEbPN+y86UXcZu2yGne12NgB5YArf5Oq2U0x6v9rIKQMjr1BTp3xe4qzURgz7AoC9Q5X63KDmROuCw/GeXoq4aiRiAZ+S/y/UhgOuk42KlBE3qHDu9V4oSQNenO8PvISTbyq6bPDQ8IQ27Q0iWiWRtoeryadguDUtDv+Sm9hZlg55DvlNJpzF5iIaL6PtCFfrFnqsu06un9/k0bThbmMIe7lnAo3Zorgc2RCXSk5Eu0PBa36/hHry94HShlUUVEtmvE/cf9X+LDtUHlBKwUNISeVNxLZFaeyPuKsAlT4JiPrq2WQcAAAAASUVORK5CYII='
    } else {
      imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADM0lEQVR4nO2ZS2xMURjHzwyq1dDSiDTCgnqTSkjakFhIBOnOAiG1KJsiSCMRVhqJruqx8IpELKXUIzYoiUcitZB4pkEtpIg01COI90++9Ju4qXTmnLn3To+YfzKrOd9/fmfuved7XGPyyuvfElABrAYagf3AHmAHsBAYbHwWMAioAx6QXp3AAuOjgHLgZgD2BdAC7AUa9CNX5pF+/xk4AMwzvggoDQA+BmqARD9rk0Bznyt0AhiWe/K/4Y4r0G2gxGK9bGY6sAXo1tjTuaHtH2o88AP4DlRmET8B6NHNLImH0g5kvUK0hvDYmbrFzEAJOKMQa0N4TFOPp9HSuUG0K0R1yGP7C/BrwB564IluZGpIn/fqUxodnRtAhwJMCenzSX1GREfnBnBNAbLO1MAo9fgYLZ0bhCQz0coQHlXqcS9aOjcIKQRFTSE8tqrHoWjp3CAWK8SVEB7n1WNVtHRuEEsV4kM25TlQALxTj5p4KO1ArirEtv4KxQzxCWC7elyOh9Lt+K0M4VGpHg+jpXODOKkQdSE81qlHS7R0bhBrFOKZNE9ZxDdorKg2Hkr7OumU1klSZiQdYpOB0qRVvOKltYO6o0AzHGJmaUyH8UX09uOi3Q4xTRpz2PgiYI5CSbc32rK+eqMx841PAs4qmOSWsjTrhgMXdW2b8U3AWOBVpkZLehddIxl9ovFR9E5SMm1EJiiiTuOrgPsWG0n16F3GV/Gn9Z2ZYYQk6jY+ChgjXZ5CjkuzrkQT6FfZlPFJ9Ca3u7qJCxbrW1LJEJibG8o0kkwunR3wLTD7LbeIKwtM7WVSeQyYbXIpaaCAZdIV6i0i+qkzYOtxjuaToxqb0g1gOTAkzg0UAhsD1So6xjmS7uG28JVT7GDg+RI9BzYDRVFuIKEvcOSdR0pyW2wCRkb4OyXAhsCzJnqp/UoirHkxcC5g3J6LqTmwqM+LIyl/irM1GwpcV6PXwIrIiTMz1AZuOWEpyMZkXyoDA5NjIbU/2ruUpdk1eJK+vJETpSo2SnueamWRY77CJXCX/gOXjCcC2pSp0SXolgbVG08E1KcOHJegt/irHttNFOG/CkNc3Lzy+u/0G2OFKmFs1enpAAAAAElFTkSuQmCC'
    }

    return imgSrc
  }













  infoTexts: string[] = [
    "Unpacking complex Bitcoin conversations from mailing lists into easy-to-follow dialogues.",
    "Explore Bitcoin your way: simple explanations or in-depth tech talk tailored for your curiosity.",
    "Bringing the Bitcoin community's discussions to life – experience mailing lists like never before.",
    "Get the best of Bitcoin discussions in simple, fun chats. No more jargon overload!",
    "Check out Bitcoin's hot topics in a snap – we turn long emails into cool, quick chats.",
    
  ];
  currentInfoText: string | null = null;
  currentTextIndex: number = 0;
  startLoadingProcess() {
    setTimeout(() => {
      this.showNextInfoText();
    }, 2000); // Delay before showing the first text
  }

  showNextInfoText() {
    this.currentInfoText = this.infoTexts[this.currentTextIndex];
    this.currentTextIndex = (this.currentTextIndex + 1) % this.infoTexts.length;

    setTimeout(() => {
      this.currentInfoText = null; // Hide the text to trigger fade-out
      setTimeout(() => {
        this.showNextInfoText(); // Show next text after fade-out
      }, 1000); // Wait for fade-out to complete
    }, 3000); // Display each text for 4 seconds
  }
}
