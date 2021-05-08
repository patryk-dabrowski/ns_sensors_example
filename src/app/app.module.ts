import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core'
import {NativeScriptModule} from '@nativescript/angular'

import {AppRoutingModule} from '~/app/app-routing.module'
import {AppComponent} from '~/app/app.component'
import {MainComponent} from '~/app/screens/main/main.component'
import {CompassComponent} from "~/app/screens/compass/compass.component";
import {AccelerometerComponent} from "~/app/screens/accelerometer/accelerometer.component";
import {BarometerComponent} from "~/app/screens/barometer/barometer.component";
import {GyroscopeComponent} from "~/app/screens/gyroscope/gyroscope.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    MainComponent,
    CompassComponent,
    AccelerometerComponent,
    BarometerComponent,
    GyroscopeComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}
