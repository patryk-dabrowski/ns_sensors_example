import {isAndroid, isIOS} from "@nativescript/core/platform";
import * as app from "@nativescript/core/application";

declare const android: any;
declare const CMMotionManager: any;

export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

const baseAcceleration = -9.81;

export class Accelerometer {
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
      const queue = NSOperationQueue.alloc().init();
      this.sensorManager.startAccelerometerUpdatesToQueueWithHandler(queue, (data, error) => {
        dispatch_async(main_queue, () => {
          wrappedCallback({
            x: data.acceleration.x,
            y: data.acceleration.y,
            z: data.acceleration.z
          });
        });
      });
    }

    if (isAndroid) {
      this.sensorManager = app.android.foregroundActivity.getSystemService(
        android.content.Context.SENSOR_SERVICE
      );

      const accelerometerSensor = this.sensorManager.getDefaultSensor(
        android.hardware.Sensor.TYPE_ACCELEROMETER
      );

      this.sensorUpdate = new android.hardware.SensorEventListener({
        onAccuracyChanged: (sensor: android.hardware.Sensor, accuracy: number) => {
        },
        onSensorChanged: (event: android.hardware.SensorEvent) => {
          wrappedCallback({
            x: event.values[0] / baseAcceleration,
            y: event.values[1] / baseAcceleration,
            z: event.values[2] / baseAcceleration
          });
        }
      })

      this.sensorManager.registerListener(
        this.sensorUpdate,
        accelerometerSensor,
        android.hardware.SensorManager.SENSOR_DELAY_NORMAL
      );
    }
  }

  stopUpdates() {
    if (isIOS && this.sensorManager) {
      this.sensorManager.stopAccelerometerUpdates();
      this.sensorManager = null;
    }
    if (isAndroid && this.sensorManager && this.sensorUpdate) {
      this.sensorManager.unregisterListener(this.sensorUpdate);
      this.sensorUpdate = undefined;
      this.sensorManager = null;
    }
  }
}
