import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeCorrectAnswer',
})
export class AnswersPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (typeof value === 'string') {
      let x = value.replace('(respuesta correcta)', '');
      x = x.replace('A)', '');
      x = x.replace('B)', '');
      x = x.replace('C)', '');
      x = x.replace('correct_answer', '');
      return x.replace('correctanswer', '');
    } else {
      return value;
    }
  }
}
