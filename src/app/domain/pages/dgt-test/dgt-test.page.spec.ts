import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgtTestPage } from './dgt-test.page';

describe('DgtTestPage', () => {
  let component: DgtTestPage;
  let fixture: ComponentFixture<DgtTestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DgtTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
