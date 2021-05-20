import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ImageService } from 'src/app/services/image.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ImageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: ImageService,
          useValue: {
            getAllImages: () => of({ id: 'shop/new/all-new', name: 'All New', categories: [], categoryType: 'subcat', totalPages: 163, groups: [] })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.get(ImageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing get Images ngOnInit', () => {
    spyOn(service, 'getAllImages').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(service.getAllImages).toHaveBeenCalledWith();
    expect(component.imageList).toEqual({ id: 'shop/new/all-new', name: 'All New', categories: [], categoryType: 'subcat', totalPages: 163, groups: [] });
  });
});
