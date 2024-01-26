import { Component, OnInit, inject } from '@angular/core';
import { Carnet } from '../../models/carnets.model';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/core/services/util/util.service';
import { Store } from '@ngrx/store';
import { Observable, finalize, mergeMap } from 'rxjs';
import { StoreModel, StoreState } from 'src/core/store/store.state';
import { Router } from '@angular/router';
import { LoadingService } from 'src/core/services/loading/loading.service';
import { OpenAiService } from 'src/core/services/openai/openai.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  openai = inject(OpenAiService);
  loading = inject(LoadingService);
  router = inject(Router);
  http = inject(HttpClient);
  util = inject(UtilService);
  storage = inject(Store<StoreModel>);
  store$!: Observable<StoreState>;
  carnets!: Carnet[];

  ngOnInit(): void {
    this.updateWithLocalStore();
    this.onLoadCarnets();
    this.store$ = this.storage.select(state => state.store);
  }

  onLoadCarnets(): void {
    this.http.get<Carnet[]>('assets/JSON/list.json').subscribe(data => this.carnets = data);
  }

  updateWithLocalStore() {
    this.util.updateTipoCarnetWithLocalStore();
  }

  setTipo(tipo: string): void {
    this.util.setTipoCarnet(tipo);
  }

  startDGTSimulator(tipoCarnet: string): void {
    this.loading.startLoader(`[IA] Generando Examen DGT - Carnet ${tipoCarnet}, esto puede demorar un poco...`).pipe(
      mergeMap(() => this.openai.getApiResponse(`Examen DGT España, tipoCarnet: ${tipoCarnet}`, 'preguntas')),
      finalize(() => this.loading.dismissLoader())
    ).subscribe(async (data) => {
      const preguntas = JSON.parse(data.choices[0].message.content);
      await this.util.setPreguntas(preguntas);
      this.router.navigate(['/tabs/home/dgt-test']);
    })
  }
}
