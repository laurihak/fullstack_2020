import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon, Table, TableBody } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setPatient } from "../state/reducer";
import EntryDetails from '../components/EntryDetails'

const PatientInformationPage: React.FC = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const fetchPatient = async () => {
    if (!Object.values(patient).find(p => p.id === id)) {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        dispatch(setPatient(patient));
      } catch (e) {
        window.alert(`error ${e.message}`);
      }
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  return (
    <div className="App">
      {!patient ? null
        : Object.values(patient).map((p: Patient) => (
          <div key={p.id}>
            {console.log('entries now', p.entries)}
            <h2>{p.name} {p.gender === "male" ? <Icon name="mars"></Icon> : <Icon name="venus"></Icon>}</h2>
            <p>ssn: {p.ssn}</p>
            <p>occupation: {p.occupation}</p>
            <div>
              {!p.entries?.length ? <h3>No Entries</h3>
                : <h3>Entries</h3>}
              {!p.entries ? null
                : Object.values(p.entries).map((e: Entry, i) => (
                  <div key={i}>
                    {console.log('entry now', e.date)}
                    <EntryDetails entry={e}/>
                      <Table fixed>
                        <TableBody>
                          {!e.diagnosisCodes ? null
                            : <Table.Row><Table.Cell><b>Diagnoses</b></Table.Cell></Table.Row>}{Object.values(diagnosis).map((diagnosisToCompare: Diagnosis) => {
                              return (
                                e.diagnosisCodes?.map(d => (
                                  d !== (diagnosisToCompare.code) ? null
                                    : <Table.Row key={diagnosisToCompare.code}>
                                      <Table.Cell key={diagnosisToCompare.code}>{diagnosisToCompare.code}</Table.Cell>
                                      <Table.Cell>{diagnosisToCompare.name}</Table.Cell>
                                    </Table.Row>
                                )));
                            })}
                        </TableBody>
                      </Table>
                  </div>
                ))
              }</div>
          </div>
        ))
      }
    </div >
  );
};

export default PatientInformationPage;