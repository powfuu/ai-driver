import { Preguntas } from "src/app/domain/models/preguntas.model";

export interface StoreState {
  tipoCarnet: string;
  preguntas: Preguntas[]
  indexPregunta: number;
}

export interface StoreModel {
  store: StoreState;
}

export const initialState: StoreState = {
  tipoCarnet: 'B',
  preguntas: [],
  indexPregunta: 1
};
