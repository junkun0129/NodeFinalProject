import * as React from 'react';
import { Component } from 'react';
import { useAppSelector } from '../store/store';
import { useEffect, useState } from 'react';
import { useMotionValue,useMotionValueEvent,useMotionTemplate, useTransform, motion, MotionValue, animate } from 'framer-motion';
import {star} from "../gamecompo/SvgPath"

type dialogType = {
    dialog:string,
    sceneState:number,
    dragX:(x:number)=>void,
    dragY:(y:number)=>void,
    dragState:(i:number)=>void
}
function HP({dialog, sceneState, dragX, dragY, dragState}:dialogType) {

    
    const hp = useAppSelector(state=>state.reducer.userStatusReducer.status.hp)
    const motionHP = useMotionValue(hp);
    const sceneStateMotionValue = useMotionValue(sceneState);
    

    //drag status
    let [dragStatus, setDragStatus] = useState(0);
    const normalMode = 0;
    const attackMode = 1;
    const shieldMode = 2;
    const itemMode = 3;
    
    
    let X = useMotionValue(0);
    let Y = useMotionValue(0);

    

    let maxhp:number = 0;
    const [ishenge, setIshenge] = useState(false);
    const dialogOpacity = useTransform(
    sceneStateMotionValue, 
    [0  ,1,2,3  ,4,5  ,0],
    [0,0.8,0,0,0.8,0,0.8]
    )
    
    useEffect(()=>{
        maxhp = hp;
    },[])

    

    useMotionValueEvent(X||Y,"change", ()=>{
        if(Y.get()<400){
            setDragStatus(attackMode)
        }else{

            if(X.get()>600){
                setDragStatus(itemMode)
            }else if(X.get()<400){
                setDragStatus(shieldMode)
            }else{
                setDragStatus(normalMode)
            }
        }
        console.log(dragStatus)
        // console.log()
    } )
   
    const HpTranform:MotionValue<number> = useTransform(motionHP, [0, maxhp], [0, 100])
    const theOtherSide = useTransform(motionHP, [0,maxhp], [100,0])
    console.log(sceneState, "scene state")
    console.log(dragStatus, "drag status")
    useEffect(()=>{
        dragState(dragStatus)
    },[dragStatus])
    
    return ( 
        <>
            <motion.div 
                drag 
                dragConstraints={{ left: 0, right: 0, top:0, bottom:0 }}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                dragElastic={0.8}
                onDrag = {(event, info)=>{
                    // console.log(info.point.x, info.point.y)
                    dragX(info.point.x)
                    dragY(info.point.y)
                    X.set(info.point.x)
                    Y.set(info.point.y)
                    
                }}
                animate = {sceneState === 2 && dragStatus === attackMode?{
                    width:50,
                    height:250,
                    borderRadius:"200px 200px 0px 0px",
                    border:"solid 6px white",
                    color: "red"
                }:sceneState === 2 && dragStatus===shieldMode?{
                    width:250,
                    height:230,
                    borderRadius:"0px 0px 200px 200px",
                    border:"solid 6px white"
                }:sceneState === 2 && dragStatus === itemMode?{
                    width:300,
                    height:230,
                    borderRadius: "121px 0px 200px 0px",
                    border:"solid 6px white",
                    
                }:sceneState === 2 &&{
                    width:200,
                    height:200,
                    borderRadius:"100px",
                    border:"solid 6px white",
                    
                }}
                transition={{duration:1,stiffness:50,damping:10, type:"spring"}}
                style={{ position:"relative",width:"100%", height:"240px", border:"10px solid white",borderRadius:"20px", boxSizing:"border-box", background: `linear-gradient(to left, lime ${HpTranform.get()}%, black ${theOtherSide.get()}%)`}}>

                {/* <motion.div style={{width:`${HpTranform}%`, height:"100%",backgroundColor:"lime"}}
                            transition={{duration:1,stiffness:50,damping:10, type:"spring"}}
                            animate = {sceneState === 2 && dragStatus === attackMode?{
                                width:"100%",
                                height:`100%`,
                                borderRadius:"100px",
                                
                            }:sceneState === 2&&{
                                width:"100%",
                                height:`20%`,
                                borderRadius:"100px",
                               
                            }}   
                >
                </motion.div> */}
         
                <motion.div
                    style={{position:"absolute",top:"0px",opacity:dialogOpacity,zIndex:"100",backgroundColor:"black",width:"100%", height:"100%" }}
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