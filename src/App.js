import "./App.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Auth from "./autification";
import Title from "./feedback/title";
import { firebaseConfig } from "./firebase/firenaseConfig";
import { useState } from "react";

function App() {
  const [isAndersen, setIsAndersen] = useState(false);
  const [isBad, setIsBad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.database();
  db.ref("categories")
    .once("value")
    .then((snapshot) => {
      setTitle(snapshot.val().headers.topics.title);
    });

  const onFinish = function ({ username, password }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        setIsAndersen(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsBad(true);
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className="App">
      {!isAndersen && <Auth onFinish={onFinish} />}
      {isAndersen && <Title text={title}></Title>}
      {isBad && <div>{errorMessage}</div>}
    </div>
  );
}

export default App;
