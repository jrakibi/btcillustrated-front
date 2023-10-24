import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { DailyUpdateData, Post } from 'src/app/core/model/daily-update-model';
import { MailingListService } from 'src/app/core/service/mailing-list-service';
import { HeaderOptions } from 'src/app/shared/header/header-options';
import { DailyUpdateDialogComponent } from '../daily-update-dialog/daily-update-dialog.component';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {
  headerOptions: HeaderOptions
  dailyUpdateData: DailyUpdateData
  constructor(
    private mailingListService: MailingListService,
    private router: Router,
    public dialog: MatDialog
  ) { }



  card_images = [
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d8176e6385fd2237826d53_animation.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d81784f14973fe80bd8d29_audio.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d817377be57f8fea64f044_business.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d8176098dc4a66f51199e3_comics.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d8176517f57ff51da79087_design.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d8171a607d4dc53c40109b_drawing.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d8170ea559e045188de682_education.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d816e9cec537ac7021225a_games.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d814f917f57f7f76a772ba_writing.svg",
    "https://assets-global.website-files.com/617825a38a48f37525a3c16f/62d815009ec3bf46d30f09bb_software.svg"
  ];

  ngOnInit(): void {
    this.headerOptions = {
      isUnderlineDisplayed: true,
    }

    this.getDailyUpdate();

    setTimeout(() => {
      this.openDialog();
    }, 2500);  // 5 seconds delay
  }

  getDailyUpdate() {
    this.mailingListService.getDailyUpdate().subscribe(
      (data: any) => {
        debugger
        this.dailyUpdateData = data
      },
      (error) => {
        console.error('There was an error loading daily update data!', error);
      }
    )
  }

  openDialog() {
    this.dialog.open(DailyUpdateDialogComponent, {
      width: '44%',
      hasBackdrop: true,
      data: {
        dailyUpdateData: this.dailyUpdateData
      }
    });
  }

  openTopic(post: Post) {
    debugger
    const dataToSend = { post: post };
    const navigationExtras: NavigationExtras = {
      state: dataToSend,
    };
    this.router.navigate(['/mailing-list', post.file_path], navigationExtras);

  }

}