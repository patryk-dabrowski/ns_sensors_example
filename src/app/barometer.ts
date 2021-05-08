import * as app from "@nativescript/core/application";
import {isAndroid, isIOS} from "@nativescript/core/platform";

declare const android: any;
declare const CMAltimeter: any;
const main_queue = dispatch_get_current_queue();

export interface BarometerData {
  pressure: number;
  relativeAltitude: number;
}

export class Barometer {
  private sensorManager: any;
  private sensorUpdate: any;

  startUpdate(callback) {
    const wrappedCallback = zonedCallback(callback);
    if (this.sensorManager || this.sensorUpdate) {
      return;
    }

    if (isIOS) {
      this.sensorManager = CMAltimeter.alloc().init();
      const queue = NSOperationQueue.alloc().init();
      this.sensorManager.startRelativeAltitudeUpdatesToQueueWithHandler(queue, (data, error) => {
        dispatch_async(main_queue, () => {
          console.log('data', data);
          wrappedCallback({
            pressure: data.pressure * 10,
            relativeAltitude: data.relativeAltitude * 10
          });
        });
      });
    }

    if (isAndroid) {
      this.sensorManager = app.android.foregroundActivity.getSystemService(
        android.content.Context.SENSOR_SERVICE
      );

      const orientationSensor = this.sensorManager.getDefaultSensor(
        android.hardware.Sensor.TYPE_PRESSURE
      );

      this.sensorUpdate = new android.hardware.SensorEventListener({
        onAccuracyChanged: (sensor: android.hardware.Sensor, accuracy: number) => {
        },
        onSensorChanged: (event: android.hardware.SensorEvent) => {
          wrappedCallback(event.values[0]);
        }
      })

      this.sensorManager.registerListener(
        this.sensorUpdate,
        orientationSensor,
        android.hardware.SensorManager.SENSOR_DELAY_UI
      );
    }
  }

  stopUpdates() {
    if (isIOS && this.sensorManager) {
      this.sensorManager.stopRelativeAltitudeUpdates();
      this.sensorManager = null;
    }
    if (isAndroid && this.sensorManager && this.sensorUpdate) {
      this.sensorManager.unregisterListener(this.sensorUpdate);
      this.sensorUpdate = undefined;
      this.sensorManager = null;
    }
  }
}
