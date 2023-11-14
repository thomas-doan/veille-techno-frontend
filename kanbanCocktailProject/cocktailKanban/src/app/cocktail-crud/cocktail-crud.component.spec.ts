import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCrudComponent } from './cocktail-crud.component';

describe('CocktailCrudComponent', () => {
  let component: CocktailCrudComponent;
  let fixture: ComponentFixture<CocktailCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailCrudComponent]
    });
    fixture = TestBed.createComponent(CocktailCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
