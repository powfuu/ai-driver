import { createAction, props } from '@ngrx/store';
import { Preguntas } from 'src/app/domain/models/preguntas.model';

export const setTipoCarnet = createAction(
  '[STORE] Set tipo carnet',
  props<{ tipoCarnet: string }>()
);

export const setPreguntas = createAction(
  '[STORE] Set preguntas',
  props<{ preguntas: Preguntas[] }>()
);

export const setIndexPregunta = createAction(
  '[STORE] Set index pregunta',
  props<{ indexPregunta: number }>()
);
