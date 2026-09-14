import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CV_METADATA } from '../shared/metadata/cv.metadata';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {

  constructor() { }

  getMetaData(): Observable<any> {
    return of(CV_METADATA);
  }
}
