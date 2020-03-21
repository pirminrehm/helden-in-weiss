import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatIconModule } from '@angular/material/icon';

// import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  exports: [MatCardModule, MatProgressSpinnerModule]
})
export class MaterialModule {}
