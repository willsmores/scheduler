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