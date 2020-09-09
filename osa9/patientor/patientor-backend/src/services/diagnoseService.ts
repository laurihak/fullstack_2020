import diagnoses from '../data/diagnoses.json';
import { Diagnosis } from '../types/Diagnose';


const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default { getDiagnoses };