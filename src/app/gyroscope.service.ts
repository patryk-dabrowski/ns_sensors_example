import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Gyroscope, GyroscopeData} from "./gyroscope";

@Injectable({
  providedIn: 'root'
})
export class GyroscopeService implements OnDestroy {
  private _data$: BehaviorSubject<GyroscopeData> = new BehaviorSubject({x: 0, y: 0, z: 0});
  private gyroscope: Gyroscope;

  constructor() {
    this.gyroscope = new Gyroscope();
  }

  get data$(): Observable<GyroscopeData> {
    return this._data$;
  }

  start() {
    this.gyroscope.startUpdate((data) => {
      this._data$.next(data);
    });
  }

  stop() {
    this.gyroscope.stopUpdates();
  }

  ngOnDestroy() {
    this.stop();
  }
}
