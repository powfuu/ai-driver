import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeCorrectAnswer'
})
export class AnswersPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const x = value.replace('(respuesta correcta)', '');
    return x.replace('correct_answer', '');
  }

}
