import {NgModule} from "@angular/core";
import {StoreModule} from '@ngrx/store';
import {MedicationsEffects} from "./effects/medications.effects";
import {EffectsModule} from '@ngrx/effects';
import * as fromMedications from './reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(fromMedications.stateFeatureKey, fromMedications.FEATURE_REDUCER, {metaReducers: fromMedications.metaReducers}),
    EffectsModule.forFeature([MedicationsEffects]),
  ],
  exports: []
})
export class MedicationsModule {
}
