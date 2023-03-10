import React from "react";
import { Copy, Plus, X } from "react-feather";

import styles from './TwitterCard.module.css'

function TwitterCard() {
    return (
        <div className={styles.container}>
            <div className={`icon ${styles.close}`}>
                <X/>
            </div>
            
            <p className={styles.text}>This is my text in the card</p>
            
            <span className={styles.line} />

            <div className={styles.bottom}>
                <div className="icon">
                    <Copy />
                </div>

                <div className={styles.right}>
                    <div className={styles.progress} style={{ "--deg": "180deg" }}>
                        <div className={styles.inner}/>
                    </div>

                    <span className={styles.bar} />

                    <div className="icon">
                        <Plus />
                    </div>

                    <span className={styles.bar}/>

                    <button className="button">Generate Thread</button>
                </div>
            </div>
        </div>
    );
}

export default TwitterCard;