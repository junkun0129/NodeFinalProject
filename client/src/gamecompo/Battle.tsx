import * as React from 'react';
import { Component } from 'react';
import styles from "./Battle.module.scss";
import {motion} from "framer-motion"
import { socketType } from './Field';
import { useState, useEffect } from 'react';
import Genkiman from '../enemycompo/Genkiman';

import Hentaiyou from '../enemycompo/Hentaiyou';

function Battle({socket}:socketType) {
    const [isEncount, setIsEncount] = useState<boolean>(false);

    useEffect(()=>{
        socket.on("screenSwitch", (data)=>{
            setIsEncount(true)
            console.log("entounttttttttttt")
          })
    },[socket])

    const variant = {
        hidden:{},
        show:{
            x:[-1600,400,0,0,0],
            scale:[0.7,0.7,0.7,0.4,1]
        }
    }

    return ( 
        <>
            <motion.div className={styles.battleBox} 
                variants = {variant}
                transition = {{delay:2, duration:2}}
                animate = {isEncount?"show":"hidden"}>
                    
                    <div className={styles.enemeyField}>
                        <div className={styles.fieldEach}>
                            <Genkiman></Genkiman>
                        </div>
                        <div className={styles.fieldEach} >
                            <Hentaiyou></Hentaiyou>
                        </div>
                        <div className={styles.fieldEach}>
                            <Genkiman></Genkiman>
                        </div>
                    </div>

                
            </motion.div>
        </>
     );
}

export default Battle;