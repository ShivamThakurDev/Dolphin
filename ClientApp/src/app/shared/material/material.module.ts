import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';

const  MaterialComponent = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
]

@NgModule({
  declarations: [],
 imports:[MaterialComponent],
 exports:[MaterialComponent]
})
export class MaterialModule { }
