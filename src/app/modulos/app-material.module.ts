import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule, MatTableModule, MatCardModule, MatIconModule, MatGridListModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule],
  exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule, MatTableModule, MatCardModule, MatIconModule, MatGridListModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule],
})
export class AppMaterialModule { }
