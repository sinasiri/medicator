import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MedicationsModule} from '@stores/medications';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
      MedicationsModule)
  ]
};
