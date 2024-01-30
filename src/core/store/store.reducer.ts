import { Store, createReducer, on } from '@ngrx/store';
import { historyInitialState, initialState } from './store.state';
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
  on(StoreActions.setSelected, (state, { id, selected }) => ({
    ...state,
    preguntas: state.preguntas.map((pregunta) =>
      pregunta.id === id ? { ...pregunta, selected } : pregunta
    ),
  })),
  on(StoreActions.clearStore, (state) => ({
    ...state,
    preguntas: [],
    indexPregunta: 1,
    tipoCarnet: 'B',
  }))
);
export const historyReducers = createReducer(
  historyInitialState,
  on(StoreActions.addHistory, (state, { store }) => ({
    ...state,
    history: [...state.history, store],
  })),
  on(StoreActions.setAllHistory, (state, { history }) => ({
    ...state,
    history: history,
  }))
);
