import * as app from "@nativescript/core/application";
import {isAndroid, isIOS} from "@nativescript/core/platform";

declare const android: any;
declare const CMMotionManager: any;

export interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

export class Gyroscope {
  private sensorManager: any;
  private sensorUpdate: any;

  startUpdate(callback) {
    const wrappedCallback = zonedCallback(callback);
    if (this.sensorManager || this.sensorUpdate) {
      return;
    }

    if (isIOS) {
      const main_queue = dispatch_get_current_queue();
      this.sensorManager = CMMotionManager.alloc().init();
      this.sensorManager.gyroUpdateInterval = 0.1
      if (this.sensorManager.gyroAvailable) {
        const queue = NSOperationQueue.alloc().init();
        this.sensorManager.startGyroUpdatesToQueueWithHandler(queue, (data, error) => {
          dispatch_async(main_queue, () => {
            wrappedCallback({
              x: data.rotationRate.x,
              y: data.rotationRate.y,
              z: data.rotationRate.z,
            });
          });
        });
      } else {
        throw new Error("Gyroscope not available.");
      }
    }

    if (isAndroid) {
      this.sensorManager = app.android.foregroundActivity.getSystemService(
        android.content.Context.SENSOR_SERVICE
      );

      const orientationSensor = this.sensorManager.getDefaultSensor(
        android.hardware.Sensor.TYPE_GYROSCOPE
      );

      this.sensorUpdate = new android.hardware.SensorEventListener({
        onAccuracyChanged: (sensor: android.hardware.Sensor, accuracy: number) => {
        },
        onSensorChanged: (event: android.hardware.SensorEvent) => {
          wrappedCallback({
            x: event.values[0],
            y: event.values[1],
            z: event.values[2],
          });
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
    if (!this.sensorManager || !this.sensorUpdate) {
      return;
    }
    if (isIOS) {
      this.sensorManager.stopGyroUpdates();
    }
    if (isAndroid) {
      this.sensorManager.unregisterListener(this.sensorUpdate);
      this.sensorUpdate = undefined;
    }

    this.sensorUpdate = null;
    this.sensorManager = null;
  }
}
