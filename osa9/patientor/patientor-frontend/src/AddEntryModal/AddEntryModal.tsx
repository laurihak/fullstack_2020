import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField, EntryOption, NumberField } from './FormField';
import { EntryType, NewEntry } from '../types';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import * as Yup from 'yup';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<NewEntry, 'id' | 'type'>;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const entryOptions: EntryOption[] = [
	{ value: EntryType.HealthCheckEntry, label: 'Health Check' },
	{ value: EntryType.HospitalEntry, label: 'Hospital' },
	{ value: EntryType.OccupationalHealthcareEntry, label: 'Occupational Healthcare' },
];

const hospitalSchema = Yup.object().shape({
	type: Yup.string().required('Required'),
	date: Yup.string().min(9, 'Too Short!').required('Required'),
	description: Yup.string().required('Required'),
	specialist: Yup.string().required('Required'),
	diagnosisCodes: Yup.array(),
	discharge: Yup.object().shape({
		date: Yup.string().required('Required'),
		criteria: Yup.string().required('Required'),
	}),
});
const OccupationalHealthcareSchema = Yup.object().shape({
	type: Yup.string().required('Required'),
	date: Yup.string().min(9, 'Too Short!').required('Required'),
	description: Yup.string().required('Required'),
	specialist: Yup.string().required('Required'),
	diagnosisCodes: Yup.array(),
	sickLeave: Yup.object().shape({
		startDate: Yup.string().required('Required'),
		endDate: Yup.string().required('Required'),
	}),
});
const HealthCheckSchema = Yup.object().shape({
	type: Yup.string().required('Required'),
	date: Yup.string().min(9, 'Too Short!').required('Required'),
	description: Yup.string().required('Required'),
	specialist: Yup.string().required('Required'),
	diagnosisCodes: Yup.array(),
	employerName: Yup.string().required('Required'),
	healtCheckRating: Yup.number().required('Required'),
});

// eslint-disable-next-line react/prop-types
export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
	const [{ diagnosis }] = useStateValue();
	const [type, setType] = useState('');
	let schema;

	if (type === 'Hospital') {
		schema = hospitalSchema;
	}
	if (type === 'OccupationalHealthcare') {
		schema = OccupationalHealthcareSchema;
	}
	if (type === 'HealthCheck') {
		schema = HealthCheckSchema;
	}

	return (
		<Formik
			initialValues={{
				type: 'Hospital',
				date: '',
				description: '',
				specialist: '',
				diagnosisCodes: [],
				discharge: {
					date: '',
					criteria: '',
				},
				sickLeave: { startDate: '', endDate: '' },
				employerName: '',
				healtCheckRating: 0,
			}}
			onSubmit={onSubmit}
			validationSchema={schema}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
				return (
					<Form className="form ui">
						<SelectField label="Type" name="type" options={entryOptions} />
						<Field label="Description" placeholder="Description" name="description" component={TextField} />
						<Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
						<Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnosis)}
						/>
						{values.type !== 'Hospital' ? null : (
							<div>
								<Field
									label="Discharge Date"
									placeholder="YYYY-MM-DD"
									name="discharge.date"
									component={TextField}
								/>
								<Field
									label="Discharge Criteria"
									placeholder="Discharge Criteria"
									name="discharge.criteria"
									component={TextField}
								/>
							</div>
						)}

						{values.type !== 'OccupationalHealthcare' ? null : (
							<div>
								<Field
									label="Employer Name"
									placeholder="Employer Name"
									name="employerName"
									component={TextField}
								/>
								<Field
									label="Sick Leave Start Date"
									placeholder="YYYY-MM-DD"
									name="sickLeave.startDate"
									component={TextField}
								/>
								<Field
									label="Sick Leave End Date"
									placeholder="YYYY-MM-DD"
									name="sickLeave.endDate"
									component={TextField}
								/>
							</div>
						)}
						{values.type !== 'HealthCheck' ? null : (
							<div>
								<Field
									label="healthCheckRating"
									name="healthCheckRating"
									component={NumberField}
									min={0}
									max={3}
								/>
							</div>
						)}
						{setTimeout(() => setType(values.type)) ? null : null}

						<Grid>
							<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onCancel} color="red">
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={5}>
								<Button type="submit" floated="right" color="green" disabled={!dirty || !isValid}>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
