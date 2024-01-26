import { Store, createReducer, on } from '@ngrx/store';
import { initialState } from './store.state';
import * as StoreActions from './store.actions';

export const storeReducers = createReducer(
  initialState,
  on(StoreActions.setTipoCarnet, (state, { tipoCarnet }) => ({
    ...state,
    tipoCarnet: tipoCarnet,
  })),
  on(StoreActions.setPreguntas, (state, { preguntas }) => ({
    ...state,
    preguntas: preguntas,
  })),
  on(StoreActions.setIndexPregunta, (state, { indexPregunta }) => ({
    ...state,
    indexPregunta: indexPregunta,
  })),
);
