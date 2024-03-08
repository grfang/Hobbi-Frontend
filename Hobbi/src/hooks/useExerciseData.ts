import { useState, useEffect } from "react";

const useExerciseData = () => {
  const [exerciseGoal, setExerciseGoal] = useState(0);
  const [skill, setSkill] = useState('');
  const [equipment, setEquipment] = useState([]);
  const user_id = "PU3T"; // TODO: Get user id from auth hook

  useEffect(() => {
    const data_url = "http://127.0.0.1:5000/data?";

    const data = {user_id: user_id};

    const fetchData = () => {
      fetch(data_url + new URLSearchParams(data))
        .then((res) => res.json())
        .then((response_data) => {
          if (response_data.success) {
            setExerciseGoal(response_data.data.exercise_info.exercise_goal);
            setSkill(response_data.data.exercise_info.skill);
            setEquipment(response_data.data.exercise_info.equipment);
          } else {
            setExerciseGoal(-1);
            setSkill('');
            setEquipment([]);
          }
        })
        .catch((err) => console.log(err));
    };
  
      fetchData();
  }, [user_id, exerciseGoal, skill, equipment]); // rerun if user_id changes

  return {exerciseGoal, skill, equipment};
};

export default useExerciseData;
