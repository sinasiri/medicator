import {MetaReducer} from '@ngrx/store';
import * as fromMedications from './medications.reducers';
import {InjectionToken} from '@angular/core';

export const stateFeatureKey = 'medications';

export interface State {
  [fromMedications.medicationsFeatureKey]: fromMedications.MedicationsState;
}

export const FEATURE_REDUCER = new InjectionToken('Feature Reducer', {
  factory: () => ({
    [fromMedications.medicationsFeatureKey]: fromMedications.reducer,
  })
});

export const metaReducers: MetaReducer<any>[] = [];
