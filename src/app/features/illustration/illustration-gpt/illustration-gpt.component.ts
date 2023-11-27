import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Illustration } from 'src/app/core/model/illustration-model';
import { OpenaiService } from 'src/app/core/service/open-ai.service';
import { HeaderOptions, HeaderLink } from 'src/app/shared/header/header-options';

@Component({
  selector: 'app-illustration-gpt',
  templateUrl: './illustration-gpt.component.html',
  styleUrls: ['./illustration-gpt.component.css']
})
export class IllustrationGptComponent implements OnInit {
  headerOptions: HeaderOptions

  illustrations: any[] = []
  illustration: Illustration

  constructor(private route: ActivatedRoute,
    private openaiService: OpenaiService,
    ) { 
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
        title: 'ILLUSTRATION',
        route: '/illustration/' + id + '/slides'
      },
      {
        title: 'GPT',
        route: '/illustration/' + id + 'gpt'
      },
      
    ]
    this.headerOptions = {
      isUnderlineDisplayed: true,
      isSlideShow: true,
      headerLinks: headerLinks,
      isDarkMode: true
    }
  }

  gptQuestion: string = '';
  gptResponse: string = '';
  isLoading: boolean = false;

  askGPT() {
    debugger
    this.isLoading = true;

    this.openaiService.askGPT(this.gptQuestion).subscribe(
      (responseText: string) => { // Explicitly type the response
        this.gptResponse = responseText;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error asking GPT:', error.message);
        console.error('Full Error:', error);
        this.isLoading = false;
      }
    );
  }



}
