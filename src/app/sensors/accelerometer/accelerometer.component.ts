import {Component, OnInit} from '@angular/core'
import {AccelerometerService} from "~/app/accelerometer.service";
import {Observable} from "rxjs";
import {AccelerometerData} from "nativescript-accelerometer";

@Component({
  selector: 'ns-accelerometer',
  templateUrl: './accelerometer.component.html',
})
export class AccelerometerComponent implements OnInit {
  public data$: Observable<AccelerometerData>;

  constructor(public accService: AccelerometerService) {
    this.data$ = accService.data$;
  }

  ngOnInit(): void {
    this.accService.start();
  }
}
