import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core'
import {Compass} from "~/app/sensors/compass/compass";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'ns-items',
  templateUrl: './compass.component.html',
})
export class CompassComponent implements OnInit, OnDestroy {
  @ViewChild('degree', {static: false}) degree: ElementRef
  @ViewChild('direction', {static: false}) direction: ElementRef
  @ViewChild('compassBg', {static: false}) compassBg: ElementRef
  angle$ = new Subject<any>();
  compass: Compass;
  private subscription: Subscription;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.compass = new Compass();
    this.compass.startUpdatingHeading(this.updateAngle.bind(this));

    this.subscription = this.angle$.subscribe(value => {
      this.degree.nativeElement.text = this.calcDegree(value);
      this.direction.nativeElement.text = this.calcDirection(value);
      this.renderer.setStyle(
        this.compassBg.nativeElement,
        'transform',
        `rotate(${value}deg)`
      );
    });
  }

  ngOnDestroy() {
    this.compass.stopUpdatingHeading();
    this.subscription.unsubscribe();
  }

  private updateAngle(data) {
    this.angle$.next(data);
  };

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
}
