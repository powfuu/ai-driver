export interface Preguntas {
  id: number;
  enunciado: string;
  respuestas: ModeloRespuestas;
  largeDescription: string;
  selected: string;
  result?: string;
}
interface ModeloRespuestas {
  A: string;
  B: string;
  C: string;
}
