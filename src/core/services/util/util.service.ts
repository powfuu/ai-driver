import { Injectable, inject } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { LocalStoreService } from '../localStore/local-store.service';
import { StoreDispatchService } from '../store-dispatch/store-dispatch.service';
import { AlertController } from '@ionic/angular';
import { Preguntas } from 'src/app/domain/models/preguntas.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  alertController = inject(AlertController);
  toastService = inject(ToastService);
  localStoreService = inject(LocalStoreService);
  storeDispatch = inject(StoreDispatchService);

  async setTipoCarnet(tipoC: string) {
    await this.localStoreService.setToLocalStore('tipoCarnet', JSON.stringify(tipoC));
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

  async crearAlertConfirmacion(canCancelar: boolean, mensaje: string, handlerAceptar: Function, header?: string, handlerCancelar?: Function) {
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
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            if (handlerAceptar) {
              handlerAceptar();
            }
          }
        }
      ]
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
          }
        },
      ]
    }
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: header || 'CONFIRMACIÓN',
      message: mensaje,
      mode: 'ios',
      buttons: buttons
    });

    await alert.present();
  }
}
