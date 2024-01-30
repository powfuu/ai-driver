import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { UtilService } from 'src/core/services/util/util.service';
import { StoreModel, StoreState } from 'src/core/store/store.state';

@Component({
  selector: 'app-dgt-result',
  templateUrl: './dgt-result.component.html',
  styleUrls: ['./dgt-result.component.scss'],
})
export class DgtResultComponent {
  storage = inject(Store<StoreModel>);
  util = inject(UtilService);
  router = inject(Router);
  store$!: Observable<StoreState>;
  dgt!: any;

  constructor() {
    this.store$ = this.storage.select((state) => state.store);
  }

  ionViewWillEnter() {
    this.saveResultToHistory();
    this.store$.pipe(take(1)).subscribe((dgt: any) => {
      this.dgt = dgt;
    });
  }

  saveResultToHistory() {
    this.store$.pipe(take(1)).subscribe((store) => {
      this.util.addHistory(store);
    });
  }

  backHome() {
    this.util.clearStore();
    this.router.navigate(['/tabs/home']);
  }

  getRespuestasCorrectas(): number {
    return (
      this.dgt?.preguntas?.preguntas.filter(
        (pregunta: any) => pregunta.result === pregunta.selected
      ).length || 0
    );
  }
}
