import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable} from "rxjs";
import {MagnetometerService} from "~/app/magnetometer.service";
import {MagnetometerData} from "~/app/magnetometer";

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

  calcDegree(angle) {
    const degree = angle - 90 >= 0 ? angle - 90 : angle + 271;
    return Math.floor(degree * 100) / 100;
  }

  calcDirection(angle) {
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

  rotate(data: any) {
    return 360 - data;
  }
}
