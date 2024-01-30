import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HistorialEvaluacionesComponent } from '../historial-evaluaciones/historial-evaluaciones.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'dgt-test',
    loadChildren: () =>
      import('../dgt-test/dgt-test.module').then((m) => m.DgtTestPageModule),
  },
  {
    path: 'historial-evaluaciones',
    component: HistorialEvaluacionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
