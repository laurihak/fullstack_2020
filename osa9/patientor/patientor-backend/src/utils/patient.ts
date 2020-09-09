/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatientEntry, Gender } from '../types/Patient';
//PatientEntry 

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    gender: parseGender(object.gender),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    entries: object.entries
  };
  return newEntry;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Invalid or missing name: ${name}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return name;
};
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Invalid or missing ssn: ${ssn}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return ssn;
};
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Invalid or missing occupation: ${occupation}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return occupation;
};
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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


export default toNewPatientEntry;