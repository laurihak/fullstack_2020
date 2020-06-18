import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getEntryById(id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.send(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;