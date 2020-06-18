/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import bmiParseAndCalculate from './bmiCalculator';
import exerciseParseAndCalculate from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello fullstack!!');
});
app.get('/bmi', (req, res) => {
  const weight: any = req.query.weight; // eslint-disable-line @typescript-eslint/no-explicit-any
  const height: any = req.query.height; // eslint-disable-line @typescript-eslint/no-explicit-any
  const result = bmiParseAndCalculate(height, weight);
  res.json(result);
});

app.post('/exercises', (req, res) => {
  const exercises: any = req.body.daily_exercises; // eslint-disable-line @typescript-eslint/no-explicit-any
  const target: any = req.body.target; // eslint-disable-line @typescript-eslint/no-explicit-any
  const result = exerciseParseAndCalculate(target, exercises);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
