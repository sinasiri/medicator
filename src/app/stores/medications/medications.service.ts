import {Injectable} from "@angular/core";
import {Medication} from './types';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  #medicationKey = 'medications';

  addMedication(newMedication: Medication | any) {
    const medications = this.getMedications();
    if (newMedication) {
      medications.push(newMedication);
      localStorage.setItem(this.#medicationKey, JSON.stringify(medications));
    }
  }

  getMedications = () => {
    const storedData = localStorage.getItem(this.#medicationKey);
    return storedData ? JSON.parse(storedData) : [];
  }

}
