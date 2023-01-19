import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // update appointment spots
  const updateSpots = function (state, appointments) {
    const newDays = [...state.days];

    // get the day and index
    const index = newDays.findIndex((day) => day.name === state.day);
    const dayObj = newDays.find((day) => day.name === state.day);

    // count the null appointments
    let spots = 0;
    for (let id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    newDays[index] = day;

    return newDays;
  };

  // book interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  // cancel interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
