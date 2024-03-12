import { useState, useEffect } from "react";

const useSleepData = () => {
  const [sleepGoal, setSleepGoal] = useState(0);
  const [wakeupTime, setWakeupTime] = useState(0);
  const [recTimes, setRecTimes] = useState([]);
  const user_id = "PU3T"; // TODO: Get user id from auth hook

  useEffect(() => {
    const data_url = "http://127.0.0.1:5000/data?";
    const times_url = "http://127.0.0.1:5000/sleep?";

    const data = {user_id: user_id};

    const fetchSleepData = () => {
      fetch(data_url + new URLSearchParams(data))
        .then((res) => res.json())
        .then((response_data) => {
          if (response_data.success) {
            setSleepGoal(response_data.data.sleep_info.sleep_goal);
            setWakeupTime(response_data.data.sleep_info.wakeup_time);
          } else {
            setSleepGoal(0);
            setWakeupTime(0);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchSleepData();

    const fetchWakeupData = () => {
        fetch(times_url + new URLSearchParams(data))
          .then((res) => res.json())
          .then((response_data) => {
            if (response_data.success) {
              setRecTimes(response_data.wakeup_times);
            } else {
              setRecTimes([]);
            }
          })
          .catch((err) => console.log(err));
      };
  
      fetchWakeupData();
  }, [user_id, sleepGoal, wakeupTime]); // rerun if user_id changes

  return {sleepGoal, wakeupTime, recTimes};
};

export default useSleepData;
