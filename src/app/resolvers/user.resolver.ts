import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from '../services/data.service';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  console.log('UserResolver called');
  const dataService = inject(DataService);
  return dataService.getData("user");
};
