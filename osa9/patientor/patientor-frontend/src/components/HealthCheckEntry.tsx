/* eslint-disable react/prop-types */
import React from 'react';
import { Table, TableBody, Icon } from 'semantic-ui-react';
import { HealthCheckEntry as HealthCheckType } from '../types';


const HealthCheckEntry: React.FC<{ entry: HealthCheckType }> = ({ entry }) => {
	type colorOfHealth = 'green' | 'yellow' | 'black' | 'purple';
	let colorHealth: colorOfHealth = 'green';
	if (entry.healthCheckRating === 3) {
		colorHealth = 'black';
	}
	if (entry.healthCheckRating === 2) {
		colorHealth = 'purple';
	}
	if (entry.healthCheckRating === 1) {
		colorHealth = 'yellow';
	}
	if (entry.healthCheckRating === 0) {
		colorHealth = 'green';
	}

	return (
		<Table>
			<TableBody>
				<Table.Row>
					<Table.Cell><div>{entry.date}<Icon name='stethoscope' size='huge' /></div>
						<div>{entry.description}</div>
						<div><Icon color={colorHealth} name='heart' size='big' /></div>
					</Table.Cell>
				</Table.Row>
			</TableBody>
		</Table>
	);
};

export default HealthCheckEntry;
