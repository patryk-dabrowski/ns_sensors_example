import * as app from "@nativescript/core/application";
import {isAndroid, isIOS} from "@nativescript/core/platform";

declare const android: any;
declare const CLLocationManager: any;

export class Magnetometer {
  private sensorManager: any;
  private sensorUpdate: any;

  startMagnetometerUpdate(callback, delay: number = 100) {
    const wrappedCallback = zonedCallback(callback);
    if (this.sensorManager || this.sensorUpdate) {
      return;
    }

    if (isIOS) {
      this.sensorManager = CLLocationManager.alloc().init();

      if (this.sensorManager.headingAvailable) {
        this.sensorManager.startUpdatingHeading();

        this.sensorUpdate = setInterval(() => {
          wrappedCallback(this.sensorManager.heading.trueHeading);
        }, delay);
      } else {
        console.error("Heading not available.")
      }
    }

    if (isAndroid) {
      this.sensorManager = app.android.foregroundActivity.getSystemService(
        android.content.Context.SENSOR_SERVICE
      );

      this.sensorUpdate = new android.hardware.SensorEventListener({
        onAccuracyChanged: (sensor: any, accuracy: any) => {},
        onSensorChanged: (event: any) => {
          wrappedCallback(event.values[0]);
        }
      })

      const orientationSensor = this.sensorManager.getDefaultSensor(
        android.hardware.Sensor.TYPE_ORIENTATION
      );
      this.sensorManager.registerListener(
        this.sensorUpdate,
        orientationSensor,
        android.hardware.SensorManager.SENSOR_DELAY_UI
      );
    }
  }

  stopMagnetometerUpdates() {
    if (!this.sensorManager || !this.sensorUpdate) {
      return;
    }
    if (isIOS) {
      this.sensorManager.stopUpdatingHeading();
      clearInterval(this.sensorUpdate);
    }
    if (isAndroid) {
      this.sensorManager.unregisterListener(this.sensorUpdate);
    }

    this.sensorUpdate = null;
    this.sensorManager = null;
  }
}
