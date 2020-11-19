import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpsClient: HttpClient) { }

  getAllImages(): Observable<any> {
    return this.httpsClient.get('./assets/data/index.json');
  }
}
