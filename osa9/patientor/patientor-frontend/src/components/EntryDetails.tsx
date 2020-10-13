import React from 'react';

import {Entry} from '../types';
import { assertNever } from 'assert-never';

import HospitalEntry from '../components/HospitalEntry';
import HealthCheckEntry from '../components/HealthCheckEntry';
import OccupationalHealthcareEntry from '../components/OccupationalHealthEntry';


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	switch (entry.type) {
	case 'Hospital':
		return <HospitalEntry entry={entry}/>;
	case 'OccupationalHealthcare':
		return <OccupationalHealthcareEntry entry={entry} />;
	case 'HealthCheck':
		return <HealthCheckEntry entry={entry} />;
	default:
		return assertNever(entry);
	}
};
  
export default EntryDetails;