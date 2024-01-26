import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { storeReducers } from 'src/core/store/store.reducer';
import { DgtTestPage } from './domain/pages/dgt-test/dgt-test.page';
import { DgtTestPageModule } from './domain/pages/dgt-test/dgt-test.module';
import { DgtQuestionComponent } from './domain/components/dgt-question/dgt-question.component';
import { DgtHeaderComponent } from './domain/components/dgt-header/dgt-header.component';
import { CoreModule } from 'src/core/core.module';
import { AnswersPipe } from './domain/pipes/answers.pipe';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    BrowserAnimationsModule, HttpClientModule, CoreModule,
    StoreModule.forRoot({ store: storeReducers })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
