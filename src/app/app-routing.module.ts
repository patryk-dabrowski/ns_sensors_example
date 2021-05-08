import {NgModule} from '@angular/core'
import {Routes} from '@angular/router'
import {NativeScriptRouterModule} from '@nativescript/angular'
import {CompassComponent} from "~/app/screens/compass/compass.component";
import {AccelerometerComponent} from "~/app/screens/accelerometer/accelerometer.component";
import {BarometerComponent} from "~/app/screens/barometer/barometer.component";
import {GyroscopeComponent} from "~/app/screens/gyroscope/gyroscope.component";
import {MainComponent} from "~/app/screens/main/main.component";

const routes: Routes = [
  {path: '', redirectTo: '/items', pathMatch: 'full'},
  {path: 'items', component: MainComponent},
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
