import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncryptionPage } from './encryption.page';

describe('EncryptionPage', () => {
  let component: EncryptionPage;
  let fixture: ComponentFixture<EncryptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncryptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
