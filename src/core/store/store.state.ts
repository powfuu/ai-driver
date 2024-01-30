import { Preguntas } from 'src/app/domain/models/preguntas.model';

export interface HistoryModel {
  history: StoreState[];
}

export interface StoreState {
  tipoCarnet: string;
  preguntas: Preguntas[];
  indexPregunta: number;
}

export interface StoreModel {
  store: StoreState;
  history: HistoryModel;
}

export const initialState: StoreState = {
  tipoCarnet: 'B',
  preguntas: [],
  indexPregunta: 1,
};

export const historyInitialState: HistoryModel = {
  history: [],
};
