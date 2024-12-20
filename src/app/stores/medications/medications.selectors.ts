import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './reducers';
import {medicationsFeatureKey} from './reducers/medications.reducers';

export const selectMedicationsFeature = createFeatureSelector<State>('medications');

export const selectMedicationsFeatureState = createSelector(
  selectMedicationsFeature,
  feature => feature[medicationsFeatureKey]
);


export const selectMedications = createSelector(
  selectMedicationsFeatureState,
  state => state?.medications
);
