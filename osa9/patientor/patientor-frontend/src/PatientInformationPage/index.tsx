import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
const PatientInformationPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const fetchPatient = async () => {
    if (!Object.values(patient).find(p => p.id === id)) {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        dispatch({ type: "SET_PATIENT", payload: patient });
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
      <Container textAlign="left">
        {!patient ? null
          : Object.values(patient).map((p: Patient) => (
            <div key={p.id}>
              <h2>{p.name} {p.gender === "male" ? <Icon name="mars"></Icon> : <Icon name="venus"></Icon>}</h2>
              <p>ssn: {p.ssn}</p>
              <p>occupation: {p.occupation}</p>
            </div>
          ))

        }
      </Container>
    </div >
  );
};

export default PatientInformationPage;