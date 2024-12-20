import {Injectable, inject} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, tap} from "rxjs";
import {MedicationsService} from '../medications.service';
import {
  addMedication, addMedicationFailure, addMedicationSuccess,
  loadMedications,
  loadMedicationsFailure,
  loadMedicationsSuccess
} from '../actions/medications.actions';


@Injectable()
export class MedicationsEffects {

  #actions$ = inject(Actions);
  #medicationService = inject(MedicationsService);

  loadMedications$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(loadMedications),
      map(() => {
        const data = this.#medicationService.getMedications();
        return loadMedicationsSuccess({data});
      }),
      catchError(error => of(loadMedicationsFailure({error})))
    )
  );


  addMedication$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(addMedication),
      map(action => action.data),
      tap(newMedication => {
        this.#medicationService.addMedication(newMedication);
      }),
      map((newMedication) => addMedicationSuccess({data: newMedication})),
      catchError(error => of(addMedicationFailure({error})))
    )
  );

}
