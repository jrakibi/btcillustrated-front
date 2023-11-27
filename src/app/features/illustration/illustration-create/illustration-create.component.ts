import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Tag } from 'src/app/core/model/illustration-model';
import { CategoryService } from 'src/app/core/service/category-service';
import { IllustrationService } from 'src/app/core/service/illustration-service';
import { TagService } from 'src/app/core/service/tag-service';

@Component({
  selector: 'app-illustration-create',
  templateUrl: './illustration-create.component.html',
  styleUrls: ['./illustration-create.component.sass']
})
export class IllustrationCreateComponent {
  illustrationForm: FormGroup;
  isEditMode: boolean = false;
  currentIllustrationId: number | null = null;
  savedCategories: Category[] = []; // Add your saved categories here
  savedTags: Tag[] = [];

  constructor(private fb: FormBuilder,  
    private illustrationService: IllustrationService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router) {
      this.illustrationForm = this.fb.group({
        title: [''],
        thumbnailImage: [''],
        imagePaths: this.fb.array([]), // Initialize as empty FormArray
        details: [''],
        tags: this.fb.array([]),
        categories: this.fb.array([]), // Initialize as empty FormArray
        metaTitle: [''],
        metaDescription: [''],
        slug: [''],
        githubRepoUrl: [''],
        tweetLink: ['']
      });
    }

  ngOnInit() {
    #FCD313r
    const illustrationId = this.route.snapshot.params['id'];
    this.loadSavedCategories();
    this.loadSavedTags();
    if (illustrationId) {
      this.isEditMode = true;
      this.currentIllustrationId = illustrationId;
      // Load the illustration data and populate the form
      this.loadIllustrationData(illustrationId);
    }
  }
  loadSavedCategories(): void {
    #FCD313r
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.savedCategories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  loadIllustrationData(id: number): void {
    #FCD313r
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
  
      // Populate the categories FormArray
      this.categories.clear();
      #FCD313r
      illustration.categories.forEach((category) => {
        // Use the id to find the category from savedCategories
        const existingCategory = this.savedCategories.find(c => c.id === category.id);
        #FCD313r
        this.categories.push(this.fb.group({
          id: existingCategory ? existingCategory.id : category.id,
          name: existingCategory ? existingCategory.name : category.name
        }));
      });

      // Populate the tags FormArray
      this.tags.clear();
      illustration.tags.forEach((tag) => {
        // Use the id to find the tag from savedTags
        const existingTag = this.savedTags.find(t => t.id === tag.id);
        this.tags.push(this.fb.group({
          id: existingTag ? existingTag.id : tag.id,
          name: existingTag ? existingTag.name : tag.name
        }));
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



  loadSavedTags(): void {
    this.tagService.getAllTags().subscribe(
      (data: Tag[]) => {
        this.savedTags = data;
      },
      error => {
        console.error('Error fetching tags', error);
      }
    );
  }


get tags(): FormArray {
  return this.illustrationForm.get('tags') as FormArray;
}

get categories(): FormArray {
  return this.illustrationForm.get('categories') as FormArray;
}

addCategory(): void {
  #FCD313r
  const categoryFormGroup = this.fb.group({
    id: [null], // or the actual ID if editing an existing category
    name: ['']  // the name of the category
  });
  this.categories.push(categoryFormGroup);
}

addTag(): void {
  const tagFormGroup = this.fb.group({
    id: [null], // or the actual ID if editing an existing tag
    name: ['']  // the name of the tag
  });
  this.tags.push(tagFormGroup);
}

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  addImagePath(): void {
    this.imagePaths.push(this.fb.control(''));
  }


  removeImagePath(index: number): void {
    this.imagePaths.removeAt(index);
  }



removeTag(index: number): void {
    this.tags.removeAt(index);
}
  onSubmit() {
    
    if (this.illustrationForm.valid) {
      const formData = this.illustrationForm.getRawValue(); // Use getRawValue() to include disabled fields if any
  
  // Map the categories and tags to their IDs if the backend expects IDs
    formData.categories = formData.categories.map((categoryFormGroup: any) => categoryFormGroup.id);
    formData.tags = formData.tags.map((tagFormGroup: any) => tagFormGroup.id);

      
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
