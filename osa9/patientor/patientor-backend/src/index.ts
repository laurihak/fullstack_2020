import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patientRouter';
import diagnoseRouter from './routes/diagnoseRouter';

const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnosis', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});