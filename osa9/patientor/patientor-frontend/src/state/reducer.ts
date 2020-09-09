import { State } from "./state";
import { Patient, Diagnosis } from "../types";


export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[];
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log('setting patientlist');
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      console.log('setting patient');
      return {
        ...state,
        patient: { [action.payload.id]: action.payload }
      };
    case "SET_DIAGNOSIS":
      console.log('setting diagnosis');
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};
export const setPatient = (patient: Patient): Action => {
  return { type: "SET_PATIENT", payload: patient };
};
export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};
export const setDiagnosis = (diagnosis: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS", payload: diagnosis };
};

