import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Accelerometer, AccelerometerData} from "~/app/sensors/accelerometer";

@Injectable({
  providedIn: 'root'
})
export class AccelerometerService implements OnDestroy {
  private _data$: BehaviorSubject<AccelerometerData> = new BehaviorSubject({x: 0, y: 0, z: 0});
  private accelerometer: Accelerometer;

  constructor() {
    this.accelerometer = new Accelerometer();
  }

  get data$(): Observable<AccelerometerData> {
    return this._data$;
  }

  start() {
    this.accelerometer.startUpdate((data) => {
      this._data$.next(data);
    });
  }

  stop() {
    this.accelerometer.stopUpdates();
  }

  ngOnDestroy() {
    this.stop();
  }
}
