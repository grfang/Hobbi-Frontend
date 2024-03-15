import { useState, useEffect } from "react";
import useHealthData from "../hooks/useHealthData";
import useAllData from "../hooks/useAllData";

const getScores = () => {
  const { sleep, workouts } = useHealthData();
  const { sleepGoal, exerciseGoal, happinessScore, journalDate } = useAllData();
  const date = new Date();
  const dateString = date.toDateString();

  const [exerciseScore, setExerciseScore] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [sentimentScore, setSentimentScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [recommendation, setRecommendation] = useState("");


  useEffect(() => {
    let newExerciseScore = 0;
    let newSleepScore = 0;
    let newSentimentScore = sentimentScore;
    let newOverallScore = 0;

    if (workouts) {
      const totalExerciseDuration = workouts.data.reduce(
        (total, workout) => total + (workout.duration / 60 / 60), 0
      );

      if (typeof totalExerciseDuration === 'number' && !isNaN(totalExerciseDuration) && exerciseGoal !== 0) {
        newExerciseScore = totalExerciseDuration / exerciseGoal;
      }
    }

    if (typeof sleep.hours === 'number' && !isNaN(sleep.hours) && sleepGoal !== 0) {
      newSleepScore = sleep.hours / sleepGoal;
    }

    if (journalDate === dateString) {
      newSentimentScore = (happinessScore + 1) / 2;
      newOverallScore = (newExerciseScore + newSleepScore + newSentimentScore) / 3;
    } else {
      newOverallScore = (newExerciseScore + newSleepScore) / 2;
    }

    let rec = ""
    let depressed = 0
    if (journalDate === dateString){
      if (happinessScore < -0.5) {
        rec = "It sounds like you're having a tough day. Consider reaching out to a friend or practicing mindfulness to help lift your mood.";
        depressed = 1;
      } else if (happinessScore >= 0.5 && happinessScore < 0) {
        rec = "You're not feeling your best today. Why not spend some time outdoors or engage in a hobby you enjoy? It might help improve your mood.";
      } else if (happinessScore >= 0 && happinessScore < 0.5) {
        rec = "You're doing okay, but there's room for improvement. Take care of any outstanding tasks or chores to alleviate any stress.";
      } else {
        rec = "You're feeling good today! Why not challenge yourself to learn something new or try a new activity?";
      }
      
      if (sleepScore < 1)
      {
        rec += " If you're feeling tired, consider taking a short nap to recharge.";
      } else if (exerciseScore < 1)
      {
        if (depressed == 1){
          rec += " Incorporating some physical activity into your day can boost your mood and energy levels. Why not go for a walk or do some exercise?";
        } else {
          rec += " If you haven't met your exercise goal, try incorporating some light physical activity into your routine, such as stretching or a short walk. However, if you're not feeling up to it, it's okay to prioritize self-care and relaxation."
        }
      } else
      {
        rec += " It seems like you're on track with your sleep and exercise goals. Take some time to relax and enjoy yourself!";
      }
    } else {
      rec = "Please write today's journal to get today's overall recommendation."
    }
    

    setExerciseScore(newExerciseScore);
    setSleepScore(newSleepScore);
    setSentimentScore(newSentimentScore);
    setOverallScore(newOverallScore);
    setRecommendation(rec);
  }, [sleep, workouts, sleepGoal, exerciseGoal, happinessScore, journalDate, dateString]);

  return { exerciseScore, sleepScore, sentimentScore, overallScore, recommendation };
};

export default getScores;
