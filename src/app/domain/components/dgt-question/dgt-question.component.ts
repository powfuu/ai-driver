import { Component, Input, inject } from '@angular/core';
import { UtilService } from 'src/core/services/util/util.service';
import { ToastService } from 'src/core/services/toast/toast.service';

@Component({
  selector: 'app-dgt-question',
  templateUrl: './dgt-question.component.html',
  styleUrls: ['./dgt-question.component.scss'],
})
export class DgtQuestionComponent {
  util = inject(UtilService);
  toast = inject(ToastService);
  @Input() store!: any;
  @Input() interval!: any;

  constructor() {}

  getPreguntaActual(): any {
    if (this.store && this.store.preguntas) {
      for (let i = 0; i < this.store.preguntas.length; i++) {
        if (this.store.indexPregunta === this.store.preguntas[i].id) {
          return this.store.preguntas[i];
        }
      }
    }
    return null;
  }

  select(selection: string, id: number): void {
    this.util.setPreguntaSelection(selection, id);
  }

  nextQuestion(): void {
    if (this.getPreguntaActual()?.selected !== undefined) {
      if (this.store.indexPregunta === this.store.preguntas.length) {
        this.stopTimer();
        this.performActionOnTimerEnd();
      } else {
        this.util.setIndexPregunta(this.store.indexPregunta + 1);
      }
    } else {
      this.toast.error(
        'Debes seleccionar alguna respuesta para avanzar de pregunta.'
      );
    }
  }

  stopTimer() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  performActionOnTimerEnd() {
    this.util.crearAlertConfirmacion(
      false,
      'Se ha finalizado el proceso de evaluación, se hará una redirección a los resultados obtenidos.',
      () => this.util.getTestResults(this.store),
      'Proceso de la evaluación'
    );
  }
}
