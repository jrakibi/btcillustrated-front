import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from 'src/app/core/resolver/data-resolver';
import { TestComponent } from 'src/app/test/test.component';
import { SlideShowComponent } from './slideshow/slideshow.component';
import { IllustrationComponent } from './illustration.component';
import { IllustrationListComponent } from './illustration-list/illustration-list.component';
import { IllustrationResourcesComponent } from './illustration-resources/illustration-resources.component';
import { IllustrationGptComponent } from './illustration-gpt/illustration-gpt.component';

const routes: Routes = [
  {
    path: '',
    component: IllustrationComponent,
    children: [
      {
        path: '',
        component: IllustrationListComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        redirectTo: ':id/slides',
        pathMatch: 'full'
      },
      {
        path: ':id/slides',
        component: SlideShowComponent,
        resolve: { data: DataResolver }
      },
      {
        path: ':id/resources',
        component: IllustrationResourcesComponent,
        resolve: { data: DataResolver }
      },
      {
        path: ':id/gpt',
        component: IllustrationGptComponent,
        resolve: { data: DataResolver }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IllustrationRoutingModule { }