// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { AppModule } from 'app/app.module';
import Theme from '@nativescript/theme';

Theme.setMode(Theme.Light);
platformNativeScriptDynamic().bootstrapModule(AppModule);
