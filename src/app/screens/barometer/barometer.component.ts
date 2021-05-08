import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable} from "rxjs";
import {BarometerService} from "~/app/barometer.service";
import {BarometerData} from "~/app/barometer";
import {isIOS} from "@nativescript/core/platform";

@Component({
  selector: 'ns-barometer',
  templateUrl: './barometer.component.html',
})
export class BarometerComponent implements OnInit, OnDestroy {
  public data$: Observable<BarometerData>;

  constructor(public service: BarometerService) {
    this.data$ = service.data$;
  }

  ngOnInit(): void {
    this.service.start();
  }

  ngOnDestroy(): void {
    this.service.stop();
  }

  parsePressure(data: BarometerData): string {
    return `Pressure: ${data.pressure.toFixed(2)} hPa`;
  }

  parseRelativeAltitude(data: BarometerData): string {
    return `Relative Altitude: ${isIOS ? data.relativeAltitude.toFixed(2) + ' m' : 'Only available on iOS'}`;
  }
}
