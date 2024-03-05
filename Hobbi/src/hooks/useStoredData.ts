import { useState, useEffect } from "react";

const useStoredData = (date: Date) => {
  const [journal, setJournal] = useState(null);
  const user_id = "PU3T"; // TODO: Get user id from auth hook

  useEffect(() => {
    const get_url = "http://127.0.0.1:5000/entry?";

    const data = { user_id: user_id, date: date.toDateString() };

    const fetchData = () => {
      fetch(get_url + new URLSearchParams(data))
        .then((res) => res.json())
        .then((response_data) => {
          if (response_data.success) {
            setJournal(response_data.data);
          } else {
            setJournal(null);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [date, user_id]); // rerun if date or user_id changes

  return journal;
};

export default useStoredData;
