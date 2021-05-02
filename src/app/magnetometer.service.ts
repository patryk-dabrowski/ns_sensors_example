import {Injectable, OnDestroy} from '@angular/core';
import {
  startAccelerometerUpdates,
  AccelerometerData,
  stopAccelerometerUpdates,
  isListening
} from "nativescript-accelerometer";
import {BehaviorSubject, Observable} from "rxjs";
import {Magnetometer} from "./magnetometer";

@Injectable({
  providedIn: 'root'
})
export class MagnetometerService implements OnDestroy {
  private _data$: BehaviorSubject<any> = new BehaviorSubject(0);
  private magnetometer: Magnetometer;

  get data$(): Observable<any> {
    return this._data$;
  }

  constructor() {
    this.magnetometer = new Magnetometer();
  }

  start() {
    this.magnetometer.startMagnetometerUpdate((data) => {
      this._data$.next(data);
    });
  }

  stop() {
    this.magnetometer.stopMagnetometerUpdates();
  }

  ngOnDestroy() {
    this.stop();
  }
}
