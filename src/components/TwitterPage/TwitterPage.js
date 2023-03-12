import React, { useEffect, useState } from "react";
import { Copy } from "react-feather";

import TwitterCard from "../TwitterCard/TwitterCard";

import {
  generatePrompts,
  generateThread,
} from "../../apis/twitter";

import styles from "./TwitterPage.module.css";

function TwitterPage() {
  const [prompts, setPrompts] = useState([]);
  const [promptInput, setPromptInput] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    prompt: "",
    thread: "",
    image: "",
  });
  const [disabledButtons, setDisabledButtons] = useState({
    prompt: false,
    thread: false,
    image: false,
  });
  const [thread, setThread] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const generateUniqueId = () =>
    (Math.random() * 98975958 + Date.now()).toString(16);

  const handleCopy = async (text) => {
    if (window.navigator?.clipboard?.writeText)
      await window.navigator.clipboard.writeText(text);
  };

  const handleThreadDeletion = (index) => {
    const tempThread = [...thread];

    tempThread.splice(index, 1);
    setThread(tempThread);
  };

  const handleThreadAddition = (index) => {
    const tempThread = [...thread];

    tempThread.splice(index + 1, 0, {
      id: generateUniqueId(),
      placeholder: "Write here...",
      value: "",
    });
    setThread(tempThread);
  };

  const handleThreadChange = (val, id) => {
    const tempThread = [...thread];

    const index = tempThread.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempThread[index].value = val;
    setThread(tempThread);
  };


  const handleThreadGeneration = async () => {
    if (thread.length == 0 || disabledButtons.thread) return;

    const tempThread = [...thread];
    const lastTweet = tempThread.pop().value;

    setDisabledButtons((prev) => ({ ...prev, thread: true }));
    const res = await generateThread(lastTweet);
    setDisabledButtons((prev) => ({ ...prev, thread: false }));

    if (!res) return;

    const data = res.choices[0].text;
    const newThread = data
      .split("\n")
      .filter((item) => item.trim())
      .map((item) => item.slice(2).trim());

    const finalThread = newThread.map((item) => ({
      id: generateUniqueId(),
      placeholder: "Write here",
      value: item,
    }));
    setThread((prev) => [...prev, ...finalThread]);
  };

  const handlePromptGeneration = async () => {
    if (!promptInput.trim()) {
      setErrorMessages((prev) => ({
        ...prev,
        prompt: "Please enter something",
      }));
      return;
    }
    setErrorMessages((prev) => ({
      ...prev,
      prompt: "",
    }));

    setPrompts([]);
    setDisabledButtons((prev) => ({ ...prev, prompt: true }));
    const res = await generatePrompts(promptInput);
    setDisabledButtons((prev) => ({ ...prev, prompt: false }));
    if (!res) {
      setErrorMessages((prev) => ({
        ...prev,
        prompt: "Error getting the prompts, please try again",
      }));
      return;
    }

    const tweets = res.choices.map((item) => item.text.trim());
    setPrompts(tweets);
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainLeft}>
        <div className={styles.topSection}>
          <label>What's in your mind today ?</label>
          <textarea
            placeholder="Writer here..."
            value={promptInput}
            onChange={(event) => setPromptInput(event.target.value)}
          />
          {errorMessages.prompt ? (
            <p className="error">{errorMessages.prompt}</p>
          ) : (
            ""
          )}
          <button
            className="button"
            onClick={handlePromptGeneration}
            disabled={disabledButtons.prompt}
          >
            {disabledButtons.prompt ? "Generating..." : "Generate prompts"}
          </button>
        </div>

        <span className={styles.line} />

        <div className={styles.prompts}>
          <p className={styles.heading}>Suggested prompts</p>
          {disabledButtons.prompt ? (
            <p>Loading...</p>
          ) : prompts.length == 0 ? (
            <p>No prompts to show, generate some new prompts. </p>
          ) : (
            prompts.map((item) => (
              <div className={styles.prompt} key={item}>
                <p className={styles.text}>{item}</p>
                <div className={styles.bottom}>
                  <div className="icon" onClick={() => handleCopy(item)}>
                    <Copy />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className={styles.mainRight}>
        <p className={styles.heading}>Your tweets</p>

        

        {thread.length == 0 ? (
          <p
            className={styles.btn}
            onClick={() =>
              setThread([
                {
                  id: generateUniqueId(),
                  value: "",
                  placeholder: "Write here...",
                },
              ])
            }
          >
            +Write a tweet
          </p>
        ) : (
          ""
        )}

        <div className={styles.cards}>
          {thread.map((item, index) => (
            <TwitterCard
              key={item.id}
              placeholder={item.placeholder}
              tweet={item.value}
              onTweetChange={(val) => handleThreadChange(val, item.id)}
              showGenerateThreadBtn={index === thread.length - 1}
              onAddClick={() => handleThreadAddition(index)}
              onClose={() => handleThreadDeletion(index)}
              onGenerateThreadClick={handleThreadGeneration}
              generateButtonDisabled={disabledButtons.thread}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TwitterPage;