/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender, NewBaseEntry, NewEntry } from '../types/Patient';
import { Diagnosis } from '../types/Diagnose'
import { HealthCheckRating, Discharge, SickLeave } from '../types/Patient'
//PatientEntry 

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    gender: parseGender(object.gender),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    entries: object.entries
  };
  return newPatient;
};

const toNewEntryBase = (object: any): NewBaseEntry => {
  const newEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseDescriptionType(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialistType(object.specialist),
  };
  if (object.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }
  return newEntry;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  console.log('healtcheck rating now', healthCheckRating)
  if (healthCheckRating < 0 || healthCheckRating > 3 || !Number.isInteger(healthCheckRating)) {
    throw new Error(`Invalid or missing healthCheckRating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error(`Invalid or missing discharge: ${sickLeave}`);
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  }
};
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error(`Invalid or missing discharge: ${discharge}`);
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  }
};
const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error(`Invalid or missing diagnosis: ${diagnosisCodes}`);
  }
  return diagnosisCodes;
};
const parseEntryType = (type: any): string => {
  if (!type || !isString(type)) {
    throw new Error(`Invalid or missing type: ${type}`);
  }
  return type;
};
const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Invalid or missing criteria: ${criteria}`);
  }
  return criteria;
};
const parseDescriptionType = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Invalid or missing description: ${description}`);
  }
  return description;
};
const parseSpecialistType = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Invalid or missing specialist: ${specialist}`);
  }
  return specialist;
};
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Invalid or missing name: ${name}`);
  }
  return name;
};
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Invalid or missing ssn: ${ssn}`);
  }
  return ssn;
};
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Invalid or missing occupation: ${occupation}`);
  }
  return occupation;
};
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: any): string => {
  console.log('date now', date)
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
};

const toNewEntry = (object: any): NewEntry => {
  const baseEntry: NewEntry = toNewEntryBase(object) as NewEntry;
  switch (baseEntry.type) {
    case 'Hospital':
      return {...baseEntry, discharge: parseDischarge(object.discharge), }
    case 'HealthCheck':
      return {...baseEntry, healthCheckRating: parseHealthCheckRating(object.healthCheckRating) }
    case 'OccupationalHealthcare':
      return {...baseEntry, sickLeave: parseSickLeave(object.sickLeave), employerName: parseName(object.employerName)}
    default:
      return assertNever(baseEntry);
  }
};

export { toNewEntry, toNewPatient as toNewPatientEntry };