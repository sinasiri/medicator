import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MedicationsComponent} from './medications.component';
import {MedicationSearchbarComponent} from './medication-searchbar/medication-searchbar.component';
import {MedicationsListComponent} from './medications-list/medications-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [{path: '**', component: MedicationsComponent}];

@NgModule({
  declarations: [MedicationsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MedicationSearchbarComponent,
    MedicationsListComponent,
    MatButtonModule,
    MatDialogModule
  ]
})
export class MedicationsModule {
}
