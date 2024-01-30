import { clearStore } from './../../store/store.actions';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StoreActions from '../../store/store.actions';
import { Preguntas } from 'src/app/domain/models/preguntas.model';
import { HistoryModel, StoreState } from 'src/core/store/store.state';

@Injectable({
  providedIn: 'root',
})
export class StoreDispatchService {
  store = inject(Store);

  setTipoCarnet(tipoCarnet: string) {
    this.store.dispatch(StoreActions.setTipoCarnet({ tipoCarnet }));
  }

  addHistory(store: StoreState) {
    this.store.dispatch(StoreActions.addHistory({ store }));
  }

  setAllHistory(history: StoreState[]) {
    this.store.dispatch(StoreActions.setAllHistory({ history }));
  }

  setPreguntaSelection(selected: string, id: number): void {
    this.store.dispatch(StoreActions.setSelected({ id, selected }));
  }

  setPreguntas(preguntas: Preguntas[]) {
    this.store.dispatch(StoreActions.setPreguntas({ preguntas }));
  }

  setIndexPregunta(indexPregunta: number) {
    this.store.dispatch(StoreActions.setIndexPregunta({ indexPregunta }));
  }

  clearStore() {
    this.store.dispatch(StoreActions.clearStore());
  }
}
