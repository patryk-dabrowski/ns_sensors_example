import {NgModule} from '@angular/core'
import {Routes} from '@angular/router'
import {NativeScriptRouterModule} from '@nativescript/angular'

import {ItemsComponent} from './items/items.component'
import {CompassComponent} from "~/app/sensors/compass/compass.component";
import {AccelerometerComponent} from "~/app/sensors/accelerometer/accelerometer.component";
import {BarometerComponent} from "~/app/sensors/barometer/barometer.component";
import {GyroscopeComponent} from "~/app/sensors/gyroscope/gyroscope.component";

const routes: Routes = [
  {path: '', redirectTo: '/items', pathMatch: 'full'},
  {path: 'items', component: ItemsComponent},
  {path: 'compass', component: CompassComponent},
  {path: 'accelerometer', component: AccelerometerComponent},
  {path: 'barometer', component: BarometerComponent},
  {path: 'gyroscope', component: GyroscopeComponent},
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {
}
