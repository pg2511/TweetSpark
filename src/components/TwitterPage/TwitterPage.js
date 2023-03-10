import React from 'react'
import { Copy } from 'react-feather'
import TwitterCard from '../TwitterCard/TwitterCard'

import styles from './TwitterPage.module.css'

function TwitterPage () {
    return (
        <div className={styles.container}>

            <div className={styles.mainLeft}>
                <div className={styles.topSection}>
                    <label>What's in your mind today ?</label>
                    <textarea 
                    placeholder='Write here...'
                    />
                    <button className='button'>Generate prompts</button>
                </div>

                <span className={styles.line} />

                <div className={styles.prompts}>
                    <p className={styles.heading}>Suggested prompts</p>
                    <div className={styles.prompt}>
                        <p className={styles.text}> This is some text </p>
                        <div className={styles.bottom}> 
                            <div className='icon'>
                                <Copy />
                            </div>
                        </div>
                    </div>
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