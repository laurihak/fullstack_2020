import React from 'react'
import { Table, TableBody, Icon } from 'semantic-ui-react'
import { HospitalEntry as HospitalEntryType } from '../types'


const HospitalCheckEntry: React.FC<{entry: HospitalEntryType}> = ({entry}) => {
    return (
        <Table>
            <TableBody>
                <Table.Row>
                    <Table.Cell><div>{entry.date}<Icon name='hospital symbol' size='huge' /></div>
                        <div>{entry.description}</div>
                    </Table.Cell>
                </Table.Row>
            </TableBody>
        </Table>
    )
}

export default HospitalCheckEntry
