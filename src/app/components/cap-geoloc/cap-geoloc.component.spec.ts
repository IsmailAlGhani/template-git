import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapGeolocComponent } from './cap-geoloc.component';

describe('CapGeolocComponent', () => {
  let component: CapGeolocComponent;
  let fixture: ComponentFixture<CapGeolocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapGeolocComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapGeolocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
