import React from "react";
import "../Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteApp(id) {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={() => deleteApp(props.id)}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && (
        <Error
          message={"Error Saving Appointment"}
          onClose={() => {
            if (props.interview) {
              transition(EDIT);
            } else {
              transition(CREATE);
            }
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error Deleting Appointment"}
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  );
}
