import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeTrackerPage } from './time-tracker';

@NgModule({
  declarations: [
    TimeTrackerPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeTrackerPage),
  ],
})
export class TimeTrackerPageModule {}
