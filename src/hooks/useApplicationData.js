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
      // console.log(all[2].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // console.log("state days", state.days);
  // console.log("state app", state.appointments);
  // console.log("state int", state.interviewers);

  // const appointments = getAppointmentsForDay(state, state.day);

  // book interview
  function bookInterview(id, interview) {
    console.log("book Interview", "id:", id, "interview", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        // console.log(res);
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // cancel interview
  function cancelInterview(id, interview) {
    // console.log("cancel", id);

    const appointment = {
      interview: interview,
      ...state.appointments[id],
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        // console.log(res);
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
