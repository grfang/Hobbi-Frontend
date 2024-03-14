import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { TextInput, Text, View, Pressable, Modal } from "react-native";
import { styles } from "../styles";
import LoadingScreen from "../components/LoadingScreen";
import { getAuth } from "firebase/auth";
import { useAppContext } from "../contexts/AppContext";
import getScores from "../hooks/calculateScores";
import { getJournalGrade } from "../utils/scoreUtils";


export default function Journal() {
  const backend_url = "http://127.0.0.1:5000/journal?";
  const get_url = "http://127.0.0.1:5000/entry?";

  const date = new Date();

  const user = getAuth().currentUser;
  const user_id = user ? user.uid : "";

  const [isLoading, setIsLoading] = useState(true);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);

  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [value, onChangeText] = useState("");
  const [recommendation, setRecommendation] = useState("No score to base recommendation off of.")
  
  const {exerciseScore, sleepScore} = getScores();

  const { setTriggerRefresh } = useAppContext();

  useEffect(() => {
    getJournalEntry();
  }, [user_id, sleepScore, exerciseScore]);

  const getRecommendation = (sentimentScore: number) => {
    //variables:
      // sleepScore: a score out of 100, if sleepScore >= 100, then their sleep goal has been met
      // exerciseScore: a score out of 100, if exerciseScore >= 100, then their exercise goal has been met
      // sentimentScore: their happiness score from -1 to 1
    //rec is the final string that is returned and displayed
    let rec = ""
    let depressed = 0
    if (sentimentScore < -0.5) {
      rec = "You should take some time to talk with a friend or meditate.";
      depressed = 1;
    } else if (sentimentScore >= 0.5 && sentimentScore < 0) {
      rec = "You should go out for a bit or work on a hobby.";
    } else if (sentimentScore >= 0 && sentimentScore < 0.5) {
      rec = "You should complete any chores or work not done for now.";
    } else {
      rec = "You should try or learn something new today!";
    }
    
    if (sleepScore < 1)
    {
      rec += " Then go take a nap because you have not slept as much as you'd like!";
    } else if (exerciseScore < 1 && depressed != 1)
    {
      rec += " Then go do some exercise because you haven't met your daily exercise goal!";
    } else
    {
      rec += " You should go have fun!";
    }
    return rec;

  };

  const getJournalEntry = () => {
    setIsLoading(true);
    const data = { user_id: user_id, date: date.toDateString() };

    fetch(get_url + new URLSearchParams(data))
      .then((res) => res.json())
      .then((response_data) => {
        console.log(response_data);
        if (response_data.success) {
          setJournal(response_data.data);
          setRecommendation(getRecommendation(response_data.data.score));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const submitJournalEntry = () => {
    const data = {
      user_id: user_id,
      entry: value,
      date: date.toDateString(),
    };

    fetch(backend_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .finally(() => {
        getJournalEntry();
        setShowSubmissionSuccess(true);
        setTriggerRefresh(refresh => !refresh)
      });
  };

  const renderJournalInput = () => (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Journal for today.</Text>
      <Text style={styles.captionTextJournal}>
        Complete your daily entry below and receive a score determining your
        estimated happiness.
      </Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={10}
        maxLength={200}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Pressable onPress={submitJournalEntry} style={styles.button}>
        <Text style={styles.buttonText}>Submit Journal Entry</Text>
      </Pressable>

      <StatusBar style="auto" backgroundColor="" />
    </View>
  );

  const renderJournalDisplay = () => (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Journal score is:</Text>
      <Text style={styles.titleCaption}>{getJournalGrade(journal!.score)}</Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <Text style={styles.heading2}>Recommendation:</Text>
      <Text style={styles.regularText}>{recommendation}</Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />


      <Modal
        animationType="slide"
        transparent={true}
        visible={showJournalModal}
        onRequestClose={() => {
          setShowJournalModal(!showJournalModal);
        }}
      >
        <View style={styles.centeredContainer}>
          <View style={styles.modalView}>
            <Text style={styles.regularText}>{journal!.entry}</Text>
            <Pressable
              style={styles.button}
              onPress={() => setShowJournalModal(!showJournalModal)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.button}
        onPress={() => setShowJournalModal(true)}
      >
        <Text style={styles.buttonText}>View your Journal Entry</Text>
      </Pressable>

      <StatusBar style="auto" backgroundColor="" />
    </View>
  );


  const renderSubmissionSuccess = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.titleText}>Journal Entry Submitted!</Text>
      <Text style={styles.captionTextJournal}>
        Your journal entry has been submitted for scoring.
      </Text>
      <Pressable onPress={() => setShowSubmissionSuccess(false)} style={styles.button}>
        <Text style={styles.buttonText}>See Results</Text>
      </Pressable>
      <StatusBar style="auto" backgroundColor="" />
    </View>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }
  else if (showSubmissionSuccess) {
    return renderSubmissionSuccess();
  }

  return journal ? renderJournalDisplay() : renderJournalInput();
}
