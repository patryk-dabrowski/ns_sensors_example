import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Barometer, BarometerData} from "~/app/sensors/barometer";

@Injectable({
  providedIn: 'root'
})
export class BarometerService implements OnDestroy {
  private _data$: BehaviorSubject<BarometerData> = new BehaviorSubject({pressure: 0, relativeAltitude: 0});
  private barometer: Barometer;

  constructor() {
    this.barometer = new Barometer();
  }

  get data$(): Observable<BarometerData> {
    return this._data$;
  }

  start() {
    this.barometer.startUpdate((data) => {
      this._data$.next(data);
    });
  }

  stop() {
    this.barometer.stopUpdates();
  }

  ngOnDestroy() {
    this.stop();
  }
}
