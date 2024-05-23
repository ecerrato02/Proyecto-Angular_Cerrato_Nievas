import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosGratisComponent } from './juegos-gratis.component';

describe('JuegosGratisComponent', () => {
  let component: JuegosGratisComponent;
  let fixture: ComponentFixture<JuegosGratisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosGratisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuegosGratisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
