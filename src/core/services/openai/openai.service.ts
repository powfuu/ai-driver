import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  prompt_preguntas: string = "Tu funcionalidad sera darme responses de lo que la APP necesita en un formato JSON, esta app es un simulador de Examenes DGT con diversos tipos de carnet de conducir en España. en el prompt te enviare un dato que sera: tipoCarnet que basicamente es el carnet el cual se obtendran los datos necesarios, mediante el tipoCarnet que el prompt contenga me pasaras una serie de preguntas tipo Examen DGT para que el usuario las seleccione, son 20 preguntas y por cada pregunta habrán 3 posibles respuestas, A, B y C. es muy importante que tu response sea solo un JSON de lo requerido. tambien necesitamos que en la respuesta correcta coloces un texto adicional, este sera 'correct_answer' por ejemplo si A: 'respuesta correct_answer' si es la correcta, si no solo sera A: 'respuesta'. tambien necesito que en ese JSON debajo del id, haya un dato llamado largeDescription, este basicamente contendra información acerca de la pregunta, cualquier cosa que nos ayude a entender la pregunta, no dar la respuesta en concreto pero información que nos puede ayudar a entenderla o algun dato curioso/necesario sobre esta. no se mostrara ninguna imagen, todas las preguntas son solo texto, asi que no involucres eso. el modelo del JSON será el siguiente: id: number unique, largeDescription: descripcion larga como te he comentado antes, enunciado: sera la pregunta, respuestas: A: string B: string C: string, recuerda que sera un array de el numero de preguntas que te he comentado antes. necesitamos el JSON completo las 10 preguntas con los datos correspondientes. tambien necesito el formato en JSON, estos datos los recibira el frontal y hara un JSON.parse. osea que el JSON debe de formarse de un array [], ten en cuenta tambien que no quiero que me envies comentarios... necesito el JSON completo, por ejemplo: // ... otras preguntas, no se quiere esto, se quiere el JSON completo, si hay 20 preguntas entonces el JSON debera tener 10 preguntas, nada de dar como resultado // otras preguntas ni // ... y así sucesivamente con las restantes preguntas. ";
  prompt_ayuda: string = "";

  constructor(private http: HttpClient) { }

  getApiResponse(prompt: string, tipo: string): Observable<any> {
    let promptTipo = tipo === 'preguntas' ? this.prompt_preguntas : this.prompt_ayuda;
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": promptTipo },
        { "role": "user", "content": prompt }
      ]
    };

    return this.http.post<any>('https://api.openai.com/v1/chat/completions', requestBody);
  }
}
