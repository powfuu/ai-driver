import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DgtTestPage } from './dgt-test.page';
import { DgtResultComponent } from '../../components/dgt-result/dgt-result.component';

const routes: Routes = [
  {
    path: '',
    component: DgtTestPage
  },
  {
    path: 'dgt-result',
    component: DgtResultComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DgtTestPageRoutingModule { }
