import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Magnetometer, MagnetometerData} from "./magnetometer";

@Injectable({
  providedIn: 'root'
})
export class MagnetometerService implements OnDestroy {
  private _data$: BehaviorSubject<MagnetometerData> = new BehaviorSubject(0);
  private magnetometer: Magnetometer;

  constructor() {
    this.magnetometer = new Magnetometer();
  }

  get data$(): Observable<MagnetometerData> {
    return this._data$;
  }

  start() {
    this.magnetometer.startUpdate((data) => {
      this._data$.next(data);
    });
  }

  stop() {
    this.magnetometer.stopUpdates();
  }

  ngOnDestroy() {
    this.stop();
  }
}
