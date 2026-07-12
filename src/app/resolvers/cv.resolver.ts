import { ResolveFn } from '@angular/router';
import { DataService } from '../services/data.service';
import { inject } from '@angular/core';

export const CVResolver: ResolveFn<boolean> = (route, state) => {
  console.log('CVResolver called');
  const dataService = inject(DataService);
  return dataService.getData("cv");
};
