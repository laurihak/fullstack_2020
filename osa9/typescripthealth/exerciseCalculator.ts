const calculateExercises = (target: number, exercises: Array<number>) => {
  if (process.argv.length < 1) {
    throw new Error('incompatible arguments length');
  }
  console.log('target now', target);
  console.log('exercises now ', exercises);
  const { length } = exercises;
  const trainingDays = exercises.filter((n) => n > 0).length;
  const success = exercises.length > 6;
  const rating = trainingDays / target;
  const average = exercises.reduce((average, current) => average + current, 0) / length;
  let ratingDescription;
  if (rating === 1) {
    ratingDescription = 'terrible';
  }
  if (rating === 2) {
    ratingDescription = 'ok';
  } else {
    ratingDescription = 'best';
  }

  return ({
    periodlength: length,
    trainingDays,
    success,
    rating: Math.round(rating),
    ratingDescription,
    target,
    average,
  });
};

interface valuesForExercise {
  target: number,
  exercises: Array<number>
}
const parseArgumentsExercise = (targetBody: number, exercises: Array<number>): valuesForExercise => {
  if (!targetBody || !exercises) throw new Error('parameters missing');
  if (isNaN(Number(targetBody))) throw new Error('malformatted parameters');

  exercises.forEach((a) => {
    if (isNaN(a)) throw new Error('malformatted parameters');
  });
  return {
    target: targetBody,
    exercises: exercises,
  };
};
const parseAndCalculate = (targetBody: number, exercisesBody: Array<number>): unknown => {
  try {
    const { target, exercises } = parseArgumentsExercise(targetBody, exercisesBody);
    return (calculateExercises(target, exercises));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access 
    return ({ error: e.message }); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  }
};

export = parseAndCalculate;
