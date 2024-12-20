import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-medication-searchbar',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    MatIconModule,
    ReactiveFormsModule
  ],
  standalone: true,
  template: `
    <mat-form-field>
      <mat-label>
        Search
      </mat-label>
      <mat-icon matPrefix>search</mat-icon>
      <input [formControl]="searchControl" matInput>
    </mat-form-field>
  `,
  styles: `
    :host {
      width: calc(100% - 150px);

      mat-form-field {
        width: 80%;
      }
    }
  `
})
export class MedicationSearchbarComponent implements OnInit {

  @Output() searchRequested = new EventEmitter();
  searchControl = new FormControl();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => this.searchRequested.emit(value));
  }
}
