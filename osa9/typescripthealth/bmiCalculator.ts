type BMIJSON = {
  weight: number,
  height: number,
  bmi: string
};

const calculateBmi = (height: number, weight: number): BMIJSON => {
  const response = {
    height,
    weight,
    bmi: 'testi',
  };

  const result = weight / height / height * 10000;
  if (result < 15) {
    response.bmi = ('Very severely underweight');
  } else if (result < 16) {
    response.bmi = ('Severely underweight');
  } else if (result < 18.5) {
    response.bmi = ('Underweight');
  } else if (result < 25) {
    response.bmi = ('Normal (healthy weight)');
  } else if (result < 30) {
    response.bmi = ('Overweight');
  } else if (result < 35) {
    response.bmi = ('Obese Class I (Moderately obese)');
  } else if (result < 40) {
    response.bmi = ('Obese Class II (Severely obese)');
  } else {
    response.bmi = ('Obese Class III (Very severely obese)');
  }
  return response;
};

interface WeightAndHeight {
  weight: number;
  height: number;
}

type Result = WeightAndHeight;

const parseArgumentsBmi = (weight: string, height: string): Result => {
  if (!weight) throw new Error('invalid arguments');
  if (!height) throw new Error('invalid arguments');
  const response = {
    weight: NaN,
    height: NaN,
  };
  if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
    response.weight = parseInt(weight),
      response.height = parseInt(height);
  } else {
    throw new Error('malformatted parameters!');
  }
  return response;
};

const parseAndCalculate = (weightToParse: string, heightToParse: string): unknown => {
  try {
    const { weight, height } = parseArgumentsBmi(weightToParse, heightToParse);
    return (calculateBmi(weight, height));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access 
    return ({ error: e.message }); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  }
};

export = parseAndCalculate;
