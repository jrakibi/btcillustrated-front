import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppContext } from 'src/app/core/service/app-context';
import { OpenaiService } from 'src/app/core/service/open-ai.service';

@Component({
  selector: 'app-illustration-search',
  templateUrl: './illustration-search.component.html',
  styleUrls: ['./illustration-search.component.css']
})
export class IllustrationSearchComponent implements OnInit {

  showDropdown: string | null = null;
  form: FormGroup;
  isLoading = false; // New property to manage loader state

  constructor(
    private http: HttpClient,
    private router: Router,
    private openaiService: OpenaiService,
    private appContext: AppContext,
    ) {
    this.form = new FormGroup({
      userInput: new FormControl(''),
      workflow: new FormControl(''), // Assuming single selection for simplicity
      tone: new FormControl(''), // Assuming single selection for simplicity
    });
  }

  ngOnInit(): void {
  }

  submitData() {
    debugger
    this.isLoading = true; 

    if (this.form.valid) {
      const userInput = this.form.get('userInput').value;
      this.openaiService.getMindMapper(userInput).subscribe({
        next: (response) => {
          debugger
          this.appContext.storeMindMapperData(response); // Store the data
          this.isLoading = false; // Hide loading animation
          this.router.navigate(['/illustration', 'mindmapper']);
        },
        error: (err) => {
          debugger
          this.isLoading = false; // Hide loading animation
          console.error('Error generating mind map:', err);


        }
      });
    }
  }


  toggleDropdown(dropdownKey: string) {
    debugger
    this.showDropdown = this.showDropdown === dropdownKey ? null : dropdownKey;
  }

  selectDropdownOption(dropdownKey: string, option: string) {
    debugger

    this.form.get(dropdownKey).setValue(option);
    this.showDropdown = null; // Hide dropdown after selection
  }


  selectTag(prompt: string) {
  }

  
  setSearchBarValue(topic: string) {
    // Set the value of userInput to the chosen topic
    this.form.get('userInput').setValue(`Create Mind Map for ${topic}`);
    // Focus on the input field after setting its value
    setTimeout(() => {
      const inputElement: any = document.querySelector('.search-bar-ai input[type="text"]');
      inputElement.focus();
      // Place the cursor at the end of the input value
      const valLength = inputElement.value.length;
      inputElement.setSelectionRange(valLength, valLength);
    }, 0);
  }
  
}
