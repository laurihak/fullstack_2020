
import patients from '../data/patients.json';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types/Patient';
import toNewPatientEntry from '../utils/patient';

const patientEntries: PatientEntry[] = patients.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const getEntries = (): PatientEntry[] => {
  return patientEntries;
};

const getEntryById = (id: string): PatientEntry | undefined => {
  const patient = patientEntries.find(p => p.id.includes(id)) as PatientEntry;
  patient.entries = [];
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientEntries.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation
  }));
};
const addEntry = (entry: NewPatientEntry): PatientEntry => {
  console.log('adding new entry');
  const newPatientEntry = {
    id: patients.length.toString(),
    ...entry
  };
  patients.push(newPatientEntry);
  console.log('patients now', patients);
  return newPatientEntry;
};

export default { getEntries, addEntry, getNonSensitiveEntries, getEntryById };