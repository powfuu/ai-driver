import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UtilService } from 'src/core/services/util/util.service';
import { StoreModel, StoreState } from 'src/core/store/store.state';

@Component({
  selector: 'app-dgt-test',
  templateUrl: './dgt-test.page.html',
  styleUrls: ['./dgt-test.page.scss'],
})
export class DgtTestPage {
  util = inject(UtilService);
  router = inject(Router);
  storage = inject(Store<StoreModel>);
  interval!: any;
  initialRemainingTime: number = 6000;
  store$!: Observable<StoreState>;
  remainingTime: number = this.initialRemainingTime;

  constructor() {
    this.store$ = this.storage.select(state => state.store);
  }

  ionViewDidEnter() {
    this.remainingTime = this.initialRemainingTime;
    this.util.crearAlertConfirmacion(true, 'Se ha iniciado el proceso de la evaluación, consiste en 10 preguntas y un máximo de 10 minutos en el cuál se desmotraran tus conocimientos y aprenderas más acerca de la evaluación, deseas comenzar con la evaluación?', this.handleConfirmar.bind(this), 'Proceso de la evaluación', this.handleCancelar.bind(this));
  }

  ionViewDidLeave() {
    this.stopTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        this.stopTimer();
        this.performActionOnTimerEnd();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handleCancelar() {
    this.router.navigate(['']);
  }

  handleConfirmar() {
    this.startTimer();
  }

  performActionOnTimerEnd() {
    this.util.crearAlertConfirmacion(false, 'Se ha finalizado el proceso de evaluación, se hará una redirección a los resultados obtenidos.', () => this.router.navigate(['/tabs/home/dgt-test/dgt-result']), 'Proceso de la evaluación');
  }

}
