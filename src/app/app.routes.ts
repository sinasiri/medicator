import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/medications').then(m => m.MedicationsModule),
  }
];
