
import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from '../types/Patient';
import {toNewPatientEntry} from '../utils/patient';

let patientEntries: Patient[] = patients.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatients = (): Patient[] => {
  return patientEntries;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patientEntries.find(p => p.id.includes(id)) as Patient;
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientEntries.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation
  }));
};
const addPatient = (patient: NewPatient): Patient => {
  console.log('adding new patient');
  const newPatientEntry = {
    id: patients.length.toString(),
    ...patient
  };
  patients.concat(newPatientEntry);
  console.log('patients now', patients);
  return newPatientEntry;
};

const addEntryForPatient = (newEntry: NewEntry, patient: Patient): Patient => {
  const newEntryToPatient = {...newEntry, id: '1'}
  const savedPatient = { ...patient, entries: patient.entries.concat(newEntryToPatient) };
  patientEntries = patientEntries.map(p => 
    p.id === savedPatient.id ? savedPatient : p)
  return savedPatient;
};


export default { getPatients, addPatient, getNonSensitivePatients, getPatientById, addEntryForPatient };