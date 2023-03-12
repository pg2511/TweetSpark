import React, { useEffect, useState } from 'react'
import { Copy } from 'react-feather'
import { generatePrompts } from '../../apis/twitter';
import TwitterCard from '../TwitterCard/TwitterCard'

import styles from './TwitterPage.module.css'

function TwitterPage () {

    const [prompts, setPrompts] = useState([]);
    const [promptInput, setPromptInput] = useState("");
    const [errorMessages, setErrorMessages] = useState({
        prompt: "",
        thread: "",
        image: "",
    });

    // disabling buttons while api is calling
    const [disabledButtons, setDisabledButtons] = useState({
        prompt: false,
        thread: false,
        image: false,
    });


    const handleCopy = async (text) => {
        if (window.navigator?.clipboard?.writeText)
          await window.navigator.clipboard.writeText(text);
    };

      
    const handlePromptGeneration = async () => {
        if(!promptInput.trim()) {
            setErrorMessages((prev) => ({
                ...prev, 
                prompt: "Please enter something"
            }));
            return;
        }

        setErrorMessages((prev) => ({
            ...prev, 
            prompt: ""
        }));

        setPrompts([]);
        setDisabledButtons((prev) => ({ ...prev, prompt: true }));
        const res = await generatePrompts(promptInput);
        setDisabledButtons((prev) => ({ ...prev, prompt: false }));

        if(!res) {
            setErrorMessages((prev) => ({
                ...prev, 
                prompt: "Error getting the prompts, please try again"
            }));
            return;
        }

        const tweets = res.choices.map((item) => item.text.trim());
        setPrompts(tweets);
    }

    useEffect(() => {}, []);

    return (
        <div className={styles.container}>

            <div className={styles.mainLeft}>
                <div className={styles.topSection}>
                    <label>What's in your mind today ?</label>
                    <textarea 
                    placeholder='Write here...'
                    value={promptInput}
                    onChange={event=>setPromptInput(event.target.value)}
                    />
                    <button 
                        className='button' 
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
                                <div className='icon' onClick={() => handleCopy(item)}>
                                    <Copy />
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>

            <div className={styles.mainRight}>
                <p className={styles.heading}>Your tweet</p>
                <p className={styles.btn}>+Write a tweet</p>

                <div className={styles.cards}>
                    <TwitterCard />
                    <TwitterCard />
                    <TwitterCard />
                </div>
            </div>
        </div>
    )
}

export default TwitterPage