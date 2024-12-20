export interface Medication {
  name: string,
  dosage: string,
  unit: DosageTypes,
  frequency: string,
  lastUpdated: any,
  times: any[]
}

export enum DosageTypes {
  Capsules = 'Capsules',
  Tables = 'Tables',
  Applications = 'Applications',
  Drops = 'Drops',
  Milligrams = 'Milligrams',
  Micrograms = 'Micrograms',
}
