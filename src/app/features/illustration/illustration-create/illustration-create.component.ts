import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IllustrationService } from 'src/app/core/service/illustration-service';

@Component({
  selector: 'app-illustration-create',
  templateUrl: './illustration-create.component.html',
  styleUrls: ['./illustration-create.component.sass']
})
export class IllustrationCreateComponent {
  illustrationForm: FormGroup;
  isEditMode: boolean = false;
  currentIllustrationId: number | null = null;

  constructor(private fb: FormBuilder,  
    private illustrationService: IllustrationService,
    private route: ActivatedRoute,
    private router: Router) {
      this.illustrationForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(100)]],
        thumbnailImage: ['', Validators.required],
        imagePaths: this.fb.array([]), // Initialize as empty FormArray
        details: [''],
        tags: this.fb.array([]),
        categories: this.fb.array([]), // Initialize as empty FormArray
        metaTitle: ['', Validators.maxLength(60)],
        metaDescription: ['', Validators.maxLength(155)],
        slug: [''],
        githubRepoUrl: [''],
        tweetLink: ['']
      });
    }

  ngOnInit() {
    debugger
    const illustrationId = this.route.snapshot.params['id'];
    if (illustrationId) {
      this.isEditMode = true;
      this.currentIllustrationId = illustrationId;
      // Load the illustration data and populate the form
      this.loadIllustrationData(illustrationId);
    }
  }

  loadIllustrationData(id: number): void {
    debugger
    this.illustrationService.getIllustration(id).subscribe(
      (illustration) => {
        // Populate form fields
        this.illustrationForm.patchValue({
          title: illustration.title,
          thumbnailImage: illustration.thumbnailImage,
          details: illustration.details,
          metaTitle: illustration.metaTitle,
          metaDescription: illustration.metaDescription,
          slug: illustration.slug,
          githubRepoUrl: illustration.githubRepoUrl,
          tweetLink: illustration.tweetLink
        });
  
        // Populate imagePaths FormArray
        this.imagePaths.clear();
        illustration.imagePaths.forEach((path: string) => {
          this.imagePaths.push(this.fb.control(path));
        });
  
        // Populate tags FormArray
        this.tags.clear();
        illustration.tags.forEach((tag: any) => {
          this.tags.push(this.fb.control(tag.name));
        });
  
        // Populate categories FormArray
        this.categories.clear();
        illustration.categories.forEach((category: any) => {
          this.categories.push(this.fb.control(category.name));
        });
      },
      (error) => {
        console.error('Error fetching illustration', error);
        // Handle errors here, such as showing an error message to the user
      }
    );
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


  addCategory(): void {
    this.categories.push(this.fb.control(''));
  }

  removeImagePath(index: number): void {
    this.imagePaths.removeAt(index);
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }



addTag(): void {
    this.tags.push(this.fb.control(''));
}

removeTag(index: number): void {
    this.tags.removeAt(index);
}
  onSubmit() {
    
    if (this.illustrationForm.valid) {
      const formData = this.illustrationForm.value;
  
      // Transform tags into the expected structure
      formData.tags = formData.tags.map(tagName => ({ name: tagName }));
      formData.categories = formData.categories.map(categoryName => ({ name: categoryName }));
  
      
      if (this.isEditMode && this.currentIllustrationId) {
        this.illustrationService.updateIllustration(this.currentIllustrationId, formData).subscribe(
          response => {
            // Handle successful update
            this.router.navigate(['/illustration', this.currentIllustrationId]);
          },
          error => {
            // Handle error
          }
        );
      } else {
        this.illustrationService.createIllustration(formData).subscribe(
          response => {
            // Handle successful creation
            this.router.navigate(['/illustration', response.id]);
          },
          error => {
            // Handle error
          }
        );
      }
    } else {
      // Handle form validation errors
      // Iterate over the form controls and mark them as touched to show validation errors
      Object.keys(this.illustrationForm.controls).forEach(field => {
        const control = this.illustrationForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


  cancelEdit(): void {
    if (this.isEditMode) {
      this.router.navigate(['/illustration', this.currentIllustrationId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
