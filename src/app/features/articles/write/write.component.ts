import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/core/service/article-service';
import Quill from 'quill';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  quill: Quill;
  htmlText =""

  articleContent: any;
  articleName: String = "";
  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['formula'],
      ['image', 'code-block'],
      ['link'],
    ],
  };
  // modules = {
  //   formula: true,
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ['bold', 'italic', 'underline'],
  //     ['link'], // Enable link toolbar button
  //     [{ align: [] }],
  //     ['formula'],
  //     ['image', 'code-block'],
  //   ],
  //   // Enable auto-linking
  //   autoLinks: true,
  // };
  
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void { }



  onSave() {
    const article = {
      title: this.articleName,
      content: this.articleContent
    };
    this.articleService.createArticle(article).subscribe(() => {
      alert('Article saved!');
    });
  }

  onContentChanged = (event) =>{
    console.log(event.html);
    this.articleContent = event.html
  }
}
