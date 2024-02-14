import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaveProductoComponent } from './clave-producto.component';

describe('ClaveProductoComponent', () => {
  let component: ClaveProductoComponent;
  let fixture: ComponentFixture<ClaveProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaveProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaveProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
