import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IllustrationService } from 'src/app/core/service/illustration-service';

@Component({
  selector: 'app-illustration-create',
  templateUrl: './illustration-create.component.html',
  styleUrls: ['./illustration-create.component.sass']
})
export class IllustrationCreateComponent {
  illustrationForm: FormGroup;

  constructor(private fb: FormBuilder,  
    private illustrationService: IllustrationService) {}

  ngOnInit() {
    this.illustrationForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      thumbnailImage: ['', Validators.required],
      imagePaths: this.fb.array([]), // Initialize as empty FormArray
      details: ['', Validators.required],
      tags: this.fb.array([]), // Initialize as empty FormArray
      categories: this.fb.array([]), // Initialize as empty FormArray
      metaTitle: ['', Validators.maxLength(60)],
      metaDescription: ['', Validators.maxLength(155)],
      slug: ['', Validators.required],
      githubRepoUrl: [''],
      tweetLink: ['']
    });
  }

  get imagePaths(): FormArray {
    return this.illustrationForm.get('imagePaths') as FormArray;
  }

  get tags(): FormArray {
    return this.illustrationForm.get('tags') as FormArray;
  }

  get categories(): FormArray {
    return this.illustrationForm.get('categories') as FormArray;
  }

  addImagePath(): void {
    this.imagePaths.push(this.fb.control(''));
  }

  addTag(): void {
    this.tags.push(this.fb.control(''));
  }

  addCategory(): void {
    this.categories.push(this.fb.control(''));
  }

  removeImagePath(index: number): void {
    this.imagePaths.removeAt(index);
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  onSubmit() {
    debugger
    if (this.illustrationForm.valid) {
      this.illustrationService.createIllustration(this.illustrationForm.value)
        .subscribe(
          response => {
            console.log('Success:', response);
            // Handle successful response, e.g., show a success message, redirect, etc.
          },
          error => {
            console.error('Error:', error);
            // Handle error, e.g., show an error message
          }
        );
    } else {
      // Handle form validation errors
      // Iterate over the form controls and mark them as touched to show validation errors
      Object.keys(this.illustrationForm.controls).forEach(field => {
        const control = this.illustrationForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
