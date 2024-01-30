import { createAction, props } from '@ngrx/store';
import { Preguntas } from 'src/app/domain/models/preguntas.model';
import { HistoryModel, StoreState } from './store.state';

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

export const setSelected = createAction(
  '[STORE] Set selected respuesta',
  props<{ id: number; selected: string }>()
);

export const clearStore = createAction('[STORE] Clear store');

export const addHistory = createAction(
  '[HISTORY] Add history evaluations',
  props<{ store: StoreState }>()
);

export const setAllHistory = createAction(
  '[HISTORY] Set All history evaluations',
  props<{ history: StoreState[] }>()
);
