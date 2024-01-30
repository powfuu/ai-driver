import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocalStoreService } from 'src/core/services/localStore/local-store.service';
import { UtilService } from 'src/core/services/util/util.service';
import {
  HistoryModel,
  StoreModel,
  StoreState,
} from 'src/core/store/store.state';

@Component({
  selector: 'app-historial-evaluaciones',
  templateUrl: './historial-evaluaciones.component.html',
  styleUrls: ['./historial-evaluaciones.component.scss'],
})
export class HistorialEvaluacionesComponent implements OnInit {
  storage = inject(Store<StoreModel>);
  util = inject(UtilService);
  location = inject(Location);
  localStoreService = inject(LocalStoreService);
  history$!: Observable<HistoryModel>;
  constructor() {}

  ngOnInit() {
    this.history$ = this.storage.select((state) => state.history);
    this.setStoreFromLocalStore();
  }

  async setStoreFromLocalStore() {
    const currentHistory = await this.localStoreService.getFromLocalStore(
      'history'
    );
    let historyArray = currentHistory
      ? JSON.parse(String(currentHistory.value))
      : [];
    this.util.setAllHistory(historyArray);
  }

  back(): void {
    this.location.back();
  }

  getRespuestasCorrectas(history: any): number {
    return (
      history?.preguntas?.preguntas?.filter(
        (pregunta: any) => pregunta.result === pregunta.selected
      ).length || 0
    );
  }

  getPreguntas(item: any) {
    return item?.preguntas?.preguntas;
  }

  getAllRespuestasCorrectas(history: any): number {
    let totalRespuestasCorrectas = 0;

    if (Array.isArray(history)) {
      history.forEach((element: any) => {
        if (element.preguntas?.preguntas) {
          element.preguntas.preguntas.forEach((pregunta: any) => {
            if (pregunta.result === pregunta.selected) {
              totalRespuestasCorrectas++;
            }
          });
        }
      });
    }

    return totalRespuestasCorrectas;
  }

  getAllRespuestasIncorrectas(history: any): number {
    const respuestasIncorrectas: any[] = [];

    if (Array.isArray(history)) {
      history.forEach((element: any) => {
        if (element.preguntas?.preguntas) {
          element.preguntas.preguntas.forEach((pregunta: any) => {
            if (pregunta.result !== pregunta.selected) {
              respuestasIncorrectas.push(pregunta);
            }
          });
        }
      });
    }

    return respuestasIncorrectas.length;
  }
}
