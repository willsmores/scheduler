import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // console.log("pInterviewers:", props.interviewers);

  const interviewersParsed = props.interviewers.map((item) => (
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={item.id === props.value}
      setInterviewer={() => props.onChange(item.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersParsed}</ul>
    </section>
  );
}
