import {Component, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Medication} from '@stores/medications';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-medications-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, DatePipe],
  standalone: true,
  templateUrl: './medications-list.component.html',
  styleUrl: './medications-list.component.scss'
})
export class MedicationsListComponent implements OnChanges, OnInit {

  displayedColumns: string[] = ['name', 'dosage', 'frequency', 'lastUpdated'];
  dataSource = new MatTableDataSource([]);
  searchParam = input<string>('');
  medications = input<Medication[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchParam'] && !!changes['searchParam'].currentValue) {
      this.dataSource.filter = changes['searchParam']?.currentValue?.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }

    if (changes['medications'] && !!changes['medications'].currentValue) {
      this.dataSource.data = changes['medications'].currentValue;
    }
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data?.name?.toLowerCase().includes(filter);
    };
  }
}
