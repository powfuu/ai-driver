import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/core/services/util/util.service';
import { StoreState } from 'src/core/store/store.state';

@Component({
  selector: 'app-dgt-header',
  templateUrl: './dgt-header.component.html',
  styleUrls: ['./dgt-header.component.scss'],
})
export class DgtHeaderComponent {
  util = inject(UtilService);
  router = inject(Router);
  @Input() store!: StoreState;
  @Input() remainingTime!: number;

  getMinutes(): number {
    return Math.floor(this.remainingTime / 60);
  }

  getSeconds(): number {
    return this.remainingTime % 60;
  }

  salir(): void {
    this.util.crearAlertConfirmacion(true, 'Si sales el proceso se reiniciara.', () => {
      this.router.navigate(['']);
    }, 'Salir?', () => { });
  }

}
