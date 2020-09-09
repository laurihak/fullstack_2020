
import patients from '../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types/Patient';
import toNewPatientEntry from '../utils/patient';

const patientEntries: Patient[] = patients.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Patient[] => {
  return patientEntries;
};

const getEntryById = (id: string): Patient | undefined => {
  const patient = patientEntries.find(p => p.id.includes(id)) as Patient;
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
const addEntry = (entry: NewPatientEntry): Patient => {
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