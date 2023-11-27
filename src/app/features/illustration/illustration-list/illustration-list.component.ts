import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Power2 } from 'gsap';
import { Illustration, Tag, Category } from 'src/app/core/model/illustration-model';
import { CategoryService } from 'src/app/core/service/category-service';
import { IllustrationService } from 'src/app/core/service/illustration-service';
import { SearchService } from 'src/app/core/service/search-service';
import { TagService } from 'src/app/core/service/tag-service';
import { HeaderOptions } from 'src/app/shared/header/header-options';
import { LnurlPayDialogComponent } from '../lnurl-pay-dialog/lnurl-pay-dialog.component';

@Component({
  selector: 'app-illustration-list',
  templateUrl: './illustration-list.component.html',
  styleUrls: ['./illustration-list.component.css']
})
export class IllustrationListComponent implements OnInit {
  illustrations: Illustration[] = [];
  allIllustrations: Illustration[] = [];
  filteredIllustrations: Illustration[] = [];
  tags: Tag[] = []; // Sample data or fetch from a service
  headerOptions: HeaderOptions
  activeTag: string | null = null; // Property to keep track of the active tag
  selectedTags: Set<string> = new Set(); // Holds the selected tag names
  tagsWithCounts: { [key: string]: number } = {};
  categories: Category[] = []; // This will hold the categories fetched from the backend
  selectedCategory: string | null = null;
  sortOrder: string = 'custom'; // Default sort order

  constructor(private illustrationService: IllustrationService,
    private searchService: SearchService,
    private tagService: TagService,
    public dialog: MatDialog,
    private categoryService: CategoryService,
    ) {}

  ngOnInit(): void {
    this.headerOptions = {
      isUnderlineDisplayed: true,
      isDarkMode: true
    }
    this.loadIllustrations();
    this.loadTagsWithCounts()
    this.loadCategories();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LnurlPayDialogComponent, 
      { 
        width: '600px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  loadIllustrations(): void {
    this.illustrationService.getIllustrations().subscribe(
      (data: Illustration[]) => {
        this.illustrations = data.map(illustration => ({
          ...illustration,
          thumbnailLoaded: false
        }));
        this.allIllustrations = this.illustrations;
      },
      error => {
        console.error('Error fetching illustrations', error);
        // Handle errors here, e.g., show a notification to the user
      }
    );
  }


  loadTagsWithCounts(): void {
    this.tagService.getTagsWithCounts().subscribe(
      (data: { [key: string]: number }) => {
        this.tagsWithCounts = data;
      },
      error => {
        console.error('Error fetching tags with counts', error);
      }
    );
  }

  loadCategories(): void {
    // This method should call the service to fetch categories from the backend
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }
  filterIllustrationsByTag(tagName: string | null): void {
    if (tagName === null || this.activeTag === tagName) {
      // Show all illustrations if "ALL" is clicked or the same tag is clicked again
      this.illustrations = [...this.allIllustrations];
      this.activeTag = null;
    } else {
      // Filter the illustrations by the selected tag
      this.illustrations = this.allIllustrations.filter(
        illustration => illustration.tags.some(tag => tag.name === tagName)
      );
      this.activeTag = tagName;
    }
  }
  toggleTagSelection(tagName: string): void {
    if (this.selectedTags.has(tagName)) {
      this.selectedTags.delete(tagName); // Remove the tag from the selection
    } else {
      this.selectedTags.add(tagName); // Add the tag to the selection
    }
    this.filterIllustrations();
  }
  toggleCategorySelection(categoryName: string): void {
    this.selectedCategory = this.selectedCategory === categoryName ? null : categoryName;
    this.filterIllustrations();
  }
  filterIllustrations(): void {
    let filteredByTags = this.allIllustrations;
  
    // Filter by tags if any are selected
    if (this.selectedTags.size > 0) {
      filteredByTags = filteredByTags.filter(illustration =>
        illustration.tags.some(tag => this.selectedTags.has(tag.name))
      );
    }
  
    // Further filter by the selected category if there is one
    if (this.selectedCategory) {
      this.illustrations = filteredByTags.filter(illustration =>
        illustration.categories.some(category => category.name === this.selectedCategory)
      );
    } else {
      this.illustrations = filteredByTags;
    }
  }
  
 // Method to clear all filters
 clearFilters(): void {
  this.selectedTags.clear();
  this.selectedCategory = null;
  this.activeTag = null;
  this.illustrations = [...this.allIllustrations];
}

// Method to get the number of displayed illustrations
get displayedIllustrationsCount(): number {
  return this.illustrations.length  ;
}


sortIllustrations(order: string): void {
  this.sortOrder = order;
  // Implement sorting logic based on the selected order
  switch (order) {
    case 'alphabetical-asc':
      this.illustrations.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'alphabetical-desc':
      this.illustrations.sort((a, b) => b.title.localeCompare(a.title));
      break;
    // Add more cases for other sorting options
    default:
      // Custom or default sorting logic
      break;
  }
}

onLoadImage(illustration: Illustration) {
  debugger
  illustration.thumbnailLoaded = true;
}

  onSearch(query: string) {
    if (query) {
      this.searchService.searchIllustartions(query).subscribe(data => {
        this.illustrations = data;
      });
    } else {
      this.illustrations = this.allIllustrations
    }
  }

}