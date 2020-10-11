import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BotonesPage } from './botones.page';

describe('BotonesPage', () => {
  let component: BotonesPage;
  let fixture: ComponentFixture<BotonesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BotonesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
