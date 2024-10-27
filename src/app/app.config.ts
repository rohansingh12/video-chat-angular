import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(TranslateModule.forRoot())],
  
};
