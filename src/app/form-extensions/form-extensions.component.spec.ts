import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExtensionsComponent } from './form-extensions.component';

describe('FormExtensionsComponent', () => {
  let component: FormExtensionsComponent;
  let fixture: ComponentFixture<FormExtensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormExtensionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
