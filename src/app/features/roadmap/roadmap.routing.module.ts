import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from 'src/app/core/resolver/data-resolver';
import { TestComponent } from 'src/app/test/test.component';
import { RoadmapComponent } from './roadmap.component';

const routes: Routes = [
  {
    path: '',
    component: RoadmapComponent,
    children: [
      {
        path: '',
        component: RoadmapComponent,
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoadmapRoutingModule { }