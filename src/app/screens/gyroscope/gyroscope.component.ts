import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable} from "rxjs";
import {GyroscopeService} from "~/app/services/gyroscope.service";
import {GyroscopeData} from "~/app/sensors/gyroscope";

@Component({
  selector: 'ns-gyroscope',
  templateUrl: './gyroscope.component.html',
})
export class GyroscopeComponent implements OnInit, OnDestroy {
  public data$: Observable<GyroscopeData>;

  constructor(public service: GyroscopeService) {
    this.data$ = service.data$;
  }

  ngOnInit(): void {
    this.service.start();
  }

  ngOnDestroy(): void {
    this.service.stop();
  }

  parseText(data: GyroscopeData): string {
    return `x: ${data.x.toFixed(2)}, y: ${data.y.toFixed(2)}, z: ${data.z.toFixed(2)}`;
  }
}
