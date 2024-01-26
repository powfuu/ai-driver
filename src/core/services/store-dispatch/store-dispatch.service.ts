import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as StoreActions from '../../store/store.actions';
import { Preguntas } from 'src/app/domain/models/preguntas.model';

@Injectable({
  providedIn: 'root'
})
export class StoreDispatchService {
  store = inject(Store);

  setTipoCarnet(tipoCarnet: string) {
    this.store.dispatch(
      StoreActions.setTipoCarnet({ tipoCarnet })
    );
  }

  setPreguntas(preguntas: Preguntas[]) {
    this.store.dispatch(
      StoreActions.setPreguntas({ preguntas })
    );
  }

  setIndexPregunta(indexPregunta: number) {
    this.store.dispatch(
      StoreActions.setIndexPregunta({ indexPregunta })
    );
  }
}
