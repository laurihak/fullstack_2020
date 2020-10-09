import React from 'react'
import { Table, TableBody, Icon } from 'semantic-ui-react'
import { OccupationalHealthcareEntry as OccupationalHealthcareType} from '../types'


const OccupationalHealthcareEntry: React.FC<{entry: OccupationalHealthcareType}> = ({entry}) => {
    return (
        <Table>
            <TableBody>
                <Table.Row>
                    <Table.Cell><div>{entry.date}<Icon name='user md' size='huge' /></div>
                        <div>{entry.description}</div>
                    </Table.Cell>
                </Table.Row>
            </TableBody>
        </Table>
    )
}

export default OccupationalHealthcareEntry
