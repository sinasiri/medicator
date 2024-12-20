import {createAction, props} from '@ngrx/store';

export const loadMedications = createAction(
  '[Medications] Load Medications'
);

export const loadMedicationsSuccess = createAction(
  '[Medications] Load Medications Success',
  props<{ data: any[] }>()
);

export const loadMedicationsFailure = createAction(
  '[Medications] Load Medications Failure',
  props<{ error: any }>()
);


export const addMedication = createAction(
  '[Medications] Add Medication',
  props<{ data: any }>()
);

export const addMedicationSuccess = createAction(
  '[Medications] Add Medication Success',
  props<{ data: any }>()
);

export const addMedicationFailure = createAction(
  '[Medications] Add Medication Failure',
  props<{ error: any }>()
);
