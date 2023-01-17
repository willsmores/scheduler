export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  let dayAppointments;

  let queryResult = [];

  for (let item of state.days) {
    if (item.name === day) {
      dayAppointments = item.appointments;
    }
  }

  if (!dayAppointments) return [];

  for (let item in state.appointments) {
    if (dayAppointments.includes(parseInt(item))) {
      queryResult.push(state.appointments[item]);
    }
  }

  return queryResult;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day

  let dayInterviewers;

  let queryResult = [];

  for (let item of state.days) {
    if (item.name === day) {
      dayInterviewers = item.interviewers;
    }
  }

  if (dayInterviewers === undefined) return [];

  for (let item in state.interviewers) {
    if (dayInterviewers.includes(parseInt(item))) {
      queryResult.push(state.interviewers[item]);
    }
  }

  return queryResult;

  // const foundDay = state.days.find((singleDay) => {
  //   return singleDay.name === day;
  // });

  // if (state.days.length === 0 || !foundDay) {
  //   return [];
  // }

  // const interviewers = foundDay.interviewers;

  // const result = interviewers.map((id) => {
  //   return state.interviewers[id];
  // });

  // return result;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return interview;
  }

  const interviewTransformed = {};

  for (let interviewer in state.interviewers) {
    if (parseInt(interviewer) === interview.interviewer) {
      interviewTransformed["student"] = interview.student;
      interviewTransformed["interviewer"] = state.interviewers[interviewer];
    }
  }

  return interviewTransformed;

  // if (!interview) return null;

  // const selectedInterview = {
  //   student: interview.student,
  //   interviewer: state.interviewers[interview.interviewer],
  // };

  // return selectedInterview;
}
