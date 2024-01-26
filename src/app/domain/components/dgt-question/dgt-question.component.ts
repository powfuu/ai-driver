import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilService } from 'src/core/services/util/util.service';
import { StoreState } from 'src/core/store/store.state';
import { Preguntas } from '../../models/preguntas.model';
import { ToastService } from 'src/core/services/toast/toast.service';

@Component({
  selector: 'app-dgt-question',
  templateUrl: './dgt-question.component.html',
  styleUrls: ['./dgt-question.component.scss'],
})
export class DgtQuestionComponent implements OnInit {
  selected: string = '';
  util = inject(UtilService);
  toast = inject(ToastService);
  @Input() store!: any;

  constructor() { }

  ngOnInit() { }

  getPreguntaActual(): any {
    return this.store?.preguntas?.find((data: any) => this.store.indexPregunta === data.id);
  }

  select(selection: string): void {
    this.selected = selection;
  }

  nextQuestion(): void {
    if (this.selected !== '') {
      this.selected = '';
      this.util.setIndexPregunta(this.store.indexPregunta + 1);
    } else {
      this.toast.error('Debes seleccionar alguna respuesta para avanzar de pregunta.')
    }
  }
}
