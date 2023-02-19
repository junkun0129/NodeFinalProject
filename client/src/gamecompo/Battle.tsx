import * as React from 'react';
import { Component } from 'react';
import styles from "./Battle.module.scss";
import {motion, useMotionValue, useMotionValueEvent} from "framer-motion"
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

    // const [dragX, setDragX] = useState<number>(0)
    // const [dragY, setDragY] = useState<number>(0)
    let dragX = useMotionValue(0);
    let dragY = useMotionValue(0)
    
    const [drag, setDrag]= useState(0);

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


    useEffect(()=>{
        setDialog(yourturnDialog);
    },[sceneState === yourTurnScene])

    // useMotionValueEvent(dragY, "change", ()=>{
    //     console.log(dragY.get(), "kore")
    //     if(dragY.get()<400){
    //         console.log("attck")
    //     }
    // })
    
    const stateChanger = ()=>{
        if(sceneState<2){
            setSceneState(sceneState+1);
        }
        console.log("statechange")
    }
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

                    <div className={styles.innnerBattleBox}>
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
                        
                        <div style={{display:"flex", justifyContent:"center", zIndex:3}}
                            onClick = {()=>stateChanger()} 
                            className={styles.hp}
                        >  
                            <HP 
                                dialog = {dialog} 
                                sceneState = {sceneState}
                                dragX = {(x)=>dragX.set(x)}
                                dragY = {(y)=>dragY.set(y)}
                                dragState={(i)=>setDrag(i)}
                            ></HP>
                        </div>
                        <h1 style={{position:"absolute"}}>
                            {dragX.get()}<br></br>
                            {dragY.get()}
                        </h1>
                        <div className={styles.option}>
                            <motion.div 
                                    className={styles.shield}
                                    animate={drag===2?{
                                        width:"50%",
                                        height:"100%"
                                    }:{}}
                            >shield</motion.div>
                            <motion.div 
                                    className={styles.item}
                                    animate={drag===3?{
                                        width:"50%",
                                        height:"100%"
                                    }:{}}
                            >item</motion.div>
                        </div>
                    </div>
                    
                
            </motion.div>
            
            {/* <motion.div drag className={styles.you}>
                <h1>oi</h1>
            </motion.div> */}
        </>
     );
}

export default Battle;