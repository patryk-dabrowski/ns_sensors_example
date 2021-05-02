import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core'
import {NativeScriptModule} from '@nativescript/angular'

import {AppRoutingModule} from '~/app/app-routing.module'
import {AppComponent} from '~/app/app.component'
import {ItemsComponent} from '~/app/items/items.component'
import {CompassComponent} from "~/app/sensors/compass/compass.component";
import {AccelerometerComponent} from "~/app/sensors/accelerometer/accelerometer.component";
import {BarometerComponent} from "~/app/sensors/barometer/barometer.component";
import {GyroscopeComponent} from "~/app/sensors/gyroscope/gyroscope.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    ItemsComponent,
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
