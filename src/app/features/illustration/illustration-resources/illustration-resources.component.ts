import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Illustration } from 'src/app/core/model/illustration-model';
import { HeaderLink, HeaderOptions } from 'src/app/shared/header/header-options';

@Component({
  selector: 'app-illustration-resources',
  templateUrl: './illustration-resources.component.html',
  styleUrls: ['./illustration-resources.component.css']
})
export class IllustrationResourcesComponent implements OnInit {
  headerOptions: HeaderOptions

  illustrations: any[] = []
  illustration: Illustration

  constructor(private route: ActivatedRoute,) { 
      const data = this.route.snapshot.data['data'];
      this.illustrations = data
    }
  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.illustration = this.illustrations.filter(illustration => illustration.id == id)[0]

    } 
    
    let headerLinks: HeaderLink[] = [
      {
        title: 'RESOURCES',
        route: '/illustration/' + id + '/resources'
      },
      {
        title: 'ILLUSTRATIONS',
        route: '/illustration/' + id + '/slides'
      },
      {
        title: 'GPT',
        route: '/illustration/' + id + '/gpt'
      },
      
    ]
    this.headerOptions = {
      isUnderlineDisplayed: true,
      isSlideShow: true,
      headerLinks: headerLinks,
      isDarkMode: true
    }
  }

}
