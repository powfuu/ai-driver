import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DgtTestPageRoutingModule } from './dgt-test-routing.module';

import { DgtTestPage } from './dgt-test.page';
import { DgtHeaderComponent } from '../../components/dgt-header/dgt-header.component';
import { DgtQuestionComponent } from '../../components/dgt-question/dgt-question.component';
import { AnswersPipe } from '../../pipes/answers.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DgtTestPageRoutingModule,
  ],
  declarations: [DgtTestPage, DgtHeaderComponent, DgtQuestionComponent, AnswersPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DgtTestPageModule { }
