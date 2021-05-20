import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(ImageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllImages should use GET to retrieve data', () => {
    service.getAllImages().subscribe();
    const testRequest = httpTestingController.expectOne('./assets/data/index.json');
    expect(testRequest.request.method).toEqual('GET');
  });

  it('#getAllImages should return an empty object on error', (done) => {
    const expectedData: any = {
      id: 'shop/new/all-new',
      name: 'All New',
      categories: [],
      categoryType: 'subcat',
      totalPages: 163,
      groups: []
    };
    service.getAllImages().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne('./assets/data/index.json');
    testRequest.flush('error', { status: 500, statusText: 'Broken Service' });
  });
});
