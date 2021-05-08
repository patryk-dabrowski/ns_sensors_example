import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable} from "rxjs";
import {MagnetometerService} from "~/app/services/magnetometer.service";
import {MagnetometerData} from "~/app/sensors/magnetometer";

@Component({
  selector: 'ns-compass',
  templateUrl: './compass.component.html',
})
export class CompassComponent implements OnInit, OnDestroy {
  public data$: Observable<MagnetometerData>;

  constructor(private service: MagnetometerService) {
    this.data$ = service.data$;
  }

  ngOnInit(): void {
    this.service.start();
  }

  ngOnDestroy(): void {
    this.service.stop();
  }

  calcDegree(angle: number) {
    return Math.round(angle);
  }

  calcDirection(angle: number) {
    if (angle >= 22.5 && angle < 67.5) {
      return "NE";
    } else if (angle >= 67.5 && angle < 112.5) {
      return "E";
    } else if (angle >= 112.5 && angle < 157.5) {
      return "SE";
    } else if (angle >= 157.5 && angle < 202.5) {
      return "S";
    } else if (angle >= 202.5 && angle < 247.5) {
      return "SW";
    } else if (angle >= 247.5 && angle < 292.5) {
      return "W";
    } else if (angle >= 292.5 && angle < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  rotate(data: number) {
    return 270 - data;
  }
}
