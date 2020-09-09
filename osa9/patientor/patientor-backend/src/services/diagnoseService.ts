import diagnoses from '../data/diagnoses.json';
import { Diagnosis } from '../types/Diagnose';

const diagnoseEntries: Diagnosis[] = diagnoses.map(obj => {
  return obj;
});
const getDiagnoses = (): Diagnosis[] => {
  return diagnoseEntries;
};

export default { getDiagnoses };