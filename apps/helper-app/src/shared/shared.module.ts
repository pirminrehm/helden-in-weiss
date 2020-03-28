import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { InfoBoxComponent } from './info-box/info-box.component';

@NgModule({
  declarations: [InfoBoxComponent],
  imports: [CommonModule, MaterialModule],
  exports: [InfoBoxComponent]
})
export class SharedModule {}
