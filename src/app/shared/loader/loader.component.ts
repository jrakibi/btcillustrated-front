import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/service/laoding-service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
  }

}
