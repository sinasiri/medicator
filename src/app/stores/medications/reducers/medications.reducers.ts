import {createReducer, on} from "@ngrx/store";
import {addMedicationFailure, addMedicationSuccess} from '../actions/medications.actions';
import {Medication} from '@stores/medications';

export const medicationsFeatureKey = 'medications';

export interface MedicationsState {
  medications: Medication[],
  error: any
}

export const initialState: MedicationsState = {
  medications: !!localStorage.getItem('medications') ? JSON.parse(localStorage.getItem('medications') || '{}') as Medication[] : [],
  error: null
};


export const reducer = createReducer(
  initialState,

  on(addMedicationSuccess, (state, {data}) => ({
    ...state,
    medications: [...state.medications, data],
    error: null,
  })),

  on(addMedicationFailure, (state, {error}) => ({
    ...state,
    error,
  }))
);
