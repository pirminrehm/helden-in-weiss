import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [InfoBoxComponent],
  imports: [CommonModule, MaterialModule],
  exports: [InfoBoxComponent]
})
export class SharedModule {}
