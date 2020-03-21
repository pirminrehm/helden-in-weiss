import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, FlexLayoutModule],
  exports: [MatCardModule, FlexLayoutModule]
})
export class MaterialModule {}
