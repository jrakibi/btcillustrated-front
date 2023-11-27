import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DailyUpdateData } from 'src/app/core/model/daily-update-model';

@Component({
  selector: 'app-daily-update-dialog',
  templateUrl: './daily-update-dialog.component.html',
  styleUrls: ['./daily-update-dialog.component.css']
})
export class DailyUpdateDialogComponent implements OnInit {

  dailyUpdateData: DailyUpdateData
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    
    this.dailyUpdateData = this.data.dailyUpdateData

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { key1: string, key2: string };

    if (state) {
      console.log('Received Object:', state);
    }
  }

}
