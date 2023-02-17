import * as React from 'react';
import { Component } from 'react';
import styles from "./Battle.module.scss";
import {motion} from "framer-motion"
import { socketType } from './Field';
import { useState, useEffect } from 'react';
import Genkiman from '../enemycompo/Genkiman';
import {star} from "./SvgPath"
import Hentaiyou from '../enemycompo/Hentaiyou';
import HP from '../component/HP';

function Battle({socket}:socketType) {
    const [isEncount, setIsEncount] = useState<boolean>(false);
    const battleOffScene = 0;
    const appearedScene = 1
    const yourTurnScene = 2;
    const yourActionScene =3 
    const enemiesTurnScene = 4;
    const enemiesActionScene = 5
    const afterBattleScene = 6;
    const [sceneState, setSceneState] = useState<number>(0);

    const appearDialog = "Enemy appeared!!"
    const yourturnDialog = "drag and choose"
    

    const [dialog, setDialog] = useState<string>("");


    useEffect(()=>{
        socket.on("screenSwitch", (data)=>{
            setIsEncount(true)
            console.log("entounttttttttttt")
          })

        setSceneState(appearedScene);
        
    },[socket])

    useEffect(()=>{
        setDialog(appearDialog);
    },[sceneState === appearedScene])

    const variant = {
        hidden:{},
        show:{
            x:[-1600,400,0,0,0],
            scale:[0.7,0.7,0.7,0.4,1]
        }
    }

    return ( 
        <>
            <h1>{dialog}</h1>
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
                    
                    <div style={{display:"flex", justifyContent:"center"}}
                         
                    >
                        <HP dialog = {dialog} sceneState = {sceneState}></HP>
                    </div>
                    
                
            </motion.div>
                    
            
            {/* <motion.div drag className={styles.you}>
                <h1>oi</h1>
            </motion.div> */}
        </>
     );
}

export default Battle;