import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry} from '../utils/patient';
import {Patient} from '../types/Patient'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientById(id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.send(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log('adding entry now ')
  const patient = patientService.getPatientById(req.params.id) as Patient
  try {
    const newEntry = toNewEntry(req.body); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const addedEntry = patientService.addEntryForPatient(newEntry, patient);
    console.log(addedEntry)
    res.send('addedEntry');
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;