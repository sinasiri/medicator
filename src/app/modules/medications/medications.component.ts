import {Component, inject, OnInit, signal} from '@angular/core';
import {Medication} from '@stores/medications';
import {MatDialog} from '@angular/material/dialog';
import {MedicationCreateDialogComponent} from './medication-create-dialog/medication-create-dialog.component';
import {Store} from '@ngrx/store';
import * as fromMedications from '@stores/medications';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-medications',
  standalone: false,
  templateUrl: './medications.component.html',
  styleUrl: './medications.component.scss'
})
export class MedicationsComponent implements OnInit {

  medications = signal<Medication[] | any>([]);

  searchParam = signal<string>('');

  #dialog = inject(MatDialog);

  #medicationStore = inject(Store<fromMedications.State>);

  medications$: Observable<Medication[] | any>;

  onSearch = (searchParam: string) => this.searchParam.set(searchParam);

  onAdd = () => {
    const dialog = this.#dialog.open(MedicationCreateDialogComponent);
    dialog.afterClosed().subscribe((res: Medication | null) => {
      if (res) {
        this.#medicationStore.dispatch(fromMedications.addMedication({data: {...res, lastUpdated: new Date()}}));
      }
    });
  }

  ngOnInit(): void {
    this.medications$ = this.#medicationStore.select(fromMedications.selectMedications);
  }

}
