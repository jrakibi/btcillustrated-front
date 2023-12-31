import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { WriteComponent } from './features/articles/write/write.component';
import { ReadComponent } from './features/articles/read/read.component';
import { DataResolver } from './core/resolver/data-resolver';
import { SearchComponent } from './features/search/search.component';
import { ListArticlesComponent } from './features/articles/list-articles/list-articles.component';
import { TestComponent } from './test/test.component';
import { SlideShowComponent } from './features/illustration/slideshow/slideshow.component';
import { IllustrationComponent } from './features/illustration/illustration.component';
import { AboutComponent } from './features/about/about.component';
import { MailingListComponent } from './features/mailing-list/mailing-list.component';
import { NewsletterComponent } from './features/newsletter/newsletter.component';
import { SupportComponent } from './features/support/support.component';
import { MissionComponent } from './features/mission/mission.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'test',  component: TestComponent },
  { path: 'write',  component: WriteComponent },
  { path: 'read/:id',  component: ReadComponent },
  { path: 'list',  component: ListArticlesComponent }, // this will match '/read'
  { path: 'home',  component: HomeComponent },
  {
    path: 'illustration',
    loadChildren: () => import('./features/illustration/illustration.module').then(m => m.IllustrationModule)
  },
  {
    path: 'roadmap',
    loadChildren: () => import('./features/roadmap/roadmap.module').then(m => m.RoadmapModule)
  },
  { path: 'search',  component: SearchComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'newsletter',  component: NewsletterComponent },
  // { path: 'support',  component: SupportComponent },
  { path: 'support',  component: MissionComponent },
  { path: 'mission',  component: MissionComponent },
  {
    path: 'mailing-list',
    loadChildren: () => import('./features/mailing-list/mailing-list.module').then(m => m.MailingListModule)
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
