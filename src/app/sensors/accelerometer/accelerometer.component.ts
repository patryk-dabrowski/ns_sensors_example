import {Component, OnDestroy, OnInit} from '@angular/core'
import {AccelerometerService} from "~/app/accelerometer.service";
import {Observable} from "rxjs";
import {AccelerometerData} from "nativescript-accelerometer";

@Component({
  selector: 'ns-accelerometer',
  templateUrl: './accelerometer.component.html',
})
export class AccelerometerComponent implements OnInit, OnDestroy {
  public data$: Observable<AccelerometerData>;

  constructor(public service: AccelerometerService) {
    this.data$ = service.data$;
  }

  ngOnInit(): void {
    this.service.start();
  }

  ngOnDestroy(): void {
    this.service.stop();
  }

  parseText(data: AccelerometerData): string {
    return `x: ${data.x.toFixed(2)} y: ${data.y.toFixed(2)} z: ${data.z.toFixed(2)}`;
  }
}
