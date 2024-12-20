import {Component, inject, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {
  AbstractControl,
  FormArray, FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {DosageTypes} from '@stores/medications';

@Component({
  selector: 'app-medication-create-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatInputModule, FormsModule, MatIconModule, MatSelectModule, MatCardModule, MatButtonToggleModule, MatTimepickerModule],
  standalone: true,
  templateUrl: './medication-create-dialog.component.html',
  styleUrl: './medication-create-dialog.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class MedicationCreateDialogComponent implements OnInit {

  form: FormGroup;
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dosageTypes = Object.keys(DosageTypes);

  #fb = inject(FormBuilder);
  #dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    this.form = this.#fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dosage: new FormControl('', [Validators.required, Validators.min(0)]),
      unit: new FormControl('', [Validators.required]),
      days: new FormControl([], [Validators.required]),
      times: this.#fb.array([this.createTimeControl()], atLeastOneRequired()),
      lastUpdate: new FormControl('')
    })
  }

  getControl = (time: any) => time as FormControl

  get times(): FormArray {
    return this.form.get('times') as FormArray;
  }

  createTimeControl = (): FormControl => this.#fb.control('', Validators.required);

  addTime = () => !this.disableAddTime() ? this.times.push(this.createTimeControl()) : null;

  disableAddTime = () => this.times?.controls?.length >= 5;

  onAdd = () => this.#dialogRef.close(this.form.getRawValue())

}


export function atLeastOneRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as any;
    const hasAtLeastOne = formArray.controls.some((c: AbstractControl) => c?.value?.toString()?.length > 0);
    return hasAtLeastOne ? null : {atLeastOneRequired: true};
  };
}
