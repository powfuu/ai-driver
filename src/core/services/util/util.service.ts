import { clearStore } from './../../store/store.actions';
import { OpenAiService } from 'src/core/services/openai/openai.service';
import { Injectable, inject } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { LocalStoreService } from '../localStore/local-store.service';
import { StoreDispatchService } from '../store-dispatch/store-dispatch.service';
import { AlertController } from '@ionic/angular';
import { Preguntas } from 'src/app/domain/models/preguntas.model';
import { Router } from '@angular/router';
import {
  HistoryModel,
  StoreModel,
  StoreState,
} from 'src/core/store/store.state';
import { LoadingService } from '../loading/loading.service';
import { finalize, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  alertController = inject(AlertController);
  toastService = inject(ToastService);
  localStoreService = inject(LocalStoreService);
  storeDispatch = inject(StoreDispatchService);
  openAiService = inject(OpenAiService);
  loading = inject(LoadingService);
  router = inject(Router);

  getTestResults(preguntas: StoreState): void {
    this.loading
      .startLoader('Cargando resultados...')
      .pipe(
        mergeMap(() =>
          this.openAiService.getApiResponse(
            JSON.stringify(preguntas),
            'resultados'
          )
        ),
        finalize(() => this.loading.dismissLoader())
      )
      .subscribe((results) => {
        this.setResults(results);
        this.router.navigate(['/tabs/home/dgt-test/dgt-result']);
      });
  }

  setResults(results: any): void {
    this.setPreguntas(JSON.parse(results.choices[0].message.content));
  }

  async addHistory(store: StoreState) {
    const currentHistory = await this.localStoreService.getFromLocalStore(
      'history'
    );
    let historyArray = currentHistory
      ? JSON.parse(String(currentHistory.value))
      : [];

    if (!Array.isArray(historyArray)) {
      historyArray = [];
    }

    historyArray.push(store);

    await this.localStoreService.setToLocalStore(
      'history',
      JSON.stringify(historyArray)
    );
    this.storeDispatch.addHistory(store);
  }

  setAllHistory(history: StoreState[]) {
    this.storeDispatch.setAllHistory(history);
  }

  clearStore(): void {
    this.storeDispatch.clearStore();
  }

  setPreguntaSelection(selection: string, id: number): void {
    this.storeDispatch.setPreguntaSelection(selection, id);
  }

  async setTipoCarnet(tipoC: string) {
    await this.localStoreService.setToLocalStore(
      'tipoCarnet',
      JSON.stringify(tipoC)
    );
    this.storeDispatch.setTipoCarnet(tipoC);
  }

  setIndexPregunta(indexPregunta: number) {
    this.storeDispatch.setIndexPregunta(indexPregunta);
  }

  setPreguntas(preguntas: Preguntas[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storeDispatch.setPreguntas(preguntas);
      resolve();
    });
  }

  async updateTipoCarnetWithLocalStore() {
    const data = await this.localStoreService.getFromLocalStore('tipoCarnet');
    if (data && typeof data.value === 'string') {
      const tipoCarnet = JSON.parse(data.value);
      this.storeDispatch.setTipoCarnet(tipoCarnet);
    }
  }

  async crearAlertConfirmacion(
    canCancelar: boolean,
    mensaje: string,
    handlerAceptar: Function,
    header?: string,
    handlerCancelar?: Function
  ) {
    let buttons;
    if (canCancelar) {
      buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            if (handlerCancelar) {
              handlerCancelar();
            }
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            if (handlerAceptar) {
              handlerAceptar();
            }
          },
        },
      ];
    } else {
      buttons = [
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            if (handlerAceptar) {
              handlerAceptar();
            }
          },
        },
      ];
    }
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: header || 'CONFIRMACIÓN',
      message: mensaje,
      mode: 'ios',
      buttons: buttons,
    });

    await alert.present();
  }
}
