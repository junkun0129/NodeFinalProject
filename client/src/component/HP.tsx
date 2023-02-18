import * as React from 'react';
import { Component } from 'react';
import { useAppSelector } from '../store/store';
import { useEffect, useState } from 'react';
import { useMotionValue,useMotionTemplate, useTransform, motion, MotionValue, animate } from 'framer-motion';
import {star} from "../gamecompo/SvgPath"

type dialogType = {
    dialog:string,
    sceneState:number
}
function HP({dialog, sceneState}:dialogType) {

    // const dialogTemplete = useMotionTemplate`: ${dialog}`
    const hp = useAppSelector(state=>state.reducer.userStatusReducer.status.hp)
    const motionHP = useMotionValue(hp);
    const sceneStateMotionValue = useMotionValue(sceneState);
    // const [ji, setJi] = useState<MotionValue>()
    let maxhp:number = 0;
    const [ishenge, setIshenge] = useState(false);
    const dialogOpacity = useTransform(
    sceneStateMotionValue, 
    [0  ,1,2,3  ,4,5  ,0],
    [0,0.8,0,0,0.8,0,0.8]
    )
    // const hpHeight:MotionValue<number> = useTransform(motionHP, s=>s*0.1)
    useEffect(()=>{
        maxhp = hp;
    },[])

    useEffect(()=>{
        console.log(sceneState, "child state change")
    },[sceneState])

    const HpTranform:MotionValue<number> = useTransform(motionHP, [0, maxhp], [0, 100])
        
    

    
    return ( 
        <>
            <motion.div 
                drag 
                dragConstraints={{ left: 0, right: 0, top:0, bottom:0 }}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                dragElastic={0.8}
                animate = {ishenge&&{
                    width:200,
                    height:200,
                    borderRadius:"100px"
                }}
                style={{ position:"relative",width:"100%", height:"240px", border:"10px solid white",borderRadius:"20px", boxSizing:"border-box", backgroundColor:"black"}}>

                <motion.div style={{width:`${HpTranform}%`, height:"100%",backgroundColor:"lime"}}
                            animate = {ishenge&&{
                                borderRadius:200,
                            }}   
                >
                </motion.div>
         
                <motion.div
                    style={{position:"absolute",top:"0px",opacity:dialogOpacity,zIndex:"0",backgroundColor:"black",width:"100%", height:"100%" }}
                ></motion.div>

                <motion.h1 style={{position:"absolute",top:"10px",left:"50px",color:"white",  zIndex:"100"}}
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition = {{delay:1, duration:1}}
                >{dialog}</motion.h1>
            </motion.div>
        </>
     );
}

export default HP;