import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Icon, Table, TableBody } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setPatient } from "../state/reducer";

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

  console.log('diagnosis now', diagnosis);

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
              <h3>entries</h3>
              {!p.entries ? null
                : Object.values(p.entries).map((e: Entry, i) => (
                  <div key={i}>
                    {console.log('entry now', e.date)}
                    <Table>
                      <TableBody>
                        <Table.Row>
                          <Table.Cell><div>{e.date}<Icon name='user md' size='huge'/></div>
                            <div> {e.description}</div>
                            <div><Icon color='green' name='heart'/></div>
                          </Table.Cell>
                        </Table.Row>
                      </TableBody>
                    </Table>
                    <Container>
                      <Table fixed>
                        <TableBody>
                          {!diagnosis ? <p>No Diagnosis</p>
                            : Object.values(diagnosis).map((diagnosisToCompare: Diagnosis) => {
                              return (
                                e.diagnosisCodes?.map(d => (
                                  d !== (diagnosisToCompare.code) ? null
                                    : <Table.Row key={diagnosisToCompare.code}>
                                      <Table.Cell key={diagnosisToCompare.code}>{diagnosisToCompare.code}</Table.Cell>
                                      <Table.Cell> {diagnosisToCompare.name}</Table.Cell>
                                    </Table.Row>
                                )));
                            })}
                        </TableBody>
                      </Table>
                    </Container>
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