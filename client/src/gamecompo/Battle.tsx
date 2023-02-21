import * as React from 'react';
import { Component } from 'react';
import styles from "./Battle.module.scss";
import {motion, MotionValue, motionValue, useMotionValue, useMotionValueEvent, useTransform} from "framer-motion"
import { socketType } from './Field';
import { useState, useEffect } from 'react';
import Genkiman from '../enemycompo/Genkiman';
import {star} from "./SvgPath"
import Hentaiyou from '../enemycompo/Hentaiyou';
import HP from '../component/HP';
import { useAppDispatch, useAppSelector } from '../store/store';
import { atackEnemy1, atackEnemy2, atackEnemy3, createEnemy1, createEnemy2, createEnemy3 } from '../store/features/enemySlice';

export type enemeyStatusType = {
    hp:number,
    at:number
}
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

    const [error, setError] = useState("");
    const appearDialog = "Enemy appeared!!"
    const yourturnDialog = "drag and choose"
    
    const createEnemyDispatch = useAppDispatch()
    const enemy1Selector = useAppSelector(state=>state.reducer.enemy1Reducer)
    const enemy2Selector = useAppSelector(state=>state.reducer.enemy2Reducer)
    const enemy3Selector = useAppSelector(state=>state.reducer.enemy3Reducer)
    let [enemy1max, setEnemy1max]= useState(0)
    let [enemy2max, setEnemy2max]= useState(0)
    let [enemy3max, setEnemy3max]= useState(0)

    const [dialog, setDialog] = useState<string>("");

    // const [dragX, setDragX] = useState<number>(0)
    // const [dragY, setDragY] = useState<number>(0)
    let dragX = useMotionValue(0);
    let dragY = useMotionValue(0)


    
    const [drag, setDrag]= useState(0);
    const [enemy1, setEnemy1] = useState<JSX.Element|null>(null)
    const [enemy2, setEnemy2] = useState<JSX.Element|null>(null)
    const [enemy3, setEnemy3] = useState<JSX.Element|null>(null)
    const enemyhp1:MotionValue = motionValue(enemy1Selector.hp) 
    const enemyhp2:MotionValue = motionValue(enemy2Selector.hp) 
    const enemyhp3:MotionValue = motionValue(enemy3Selector.hp) 
    // const restHP1:MotionValue<number> = useTransform(enemyhp1,[0,enemy1max], [0,100])
    // const restHP2:MotionValue<number> = useTransform(enemyhp2,[0,enemy2max], [0,100])
    // const restHP3:MotionValue<number> = useTransform(enemyhp3,[0,enemy3max], [0,100])
    // const lostHP1:MotionValue<number> = useTransform(enemyhp1, [0,enemy1max],[100,0])
    // const lostHP2:MotionValue<number> = useTransform(enemyhp2, [0,enemy2max],[100,0])
    // const lostHP3:MotionValue<number> = useTransform(enemyhp3, [0,enemy3max],[100,0])
    useEffect(()=>{
        socket.on("screenSwitch", (data)=>{
            setIsEncount(true)
            console.log("entounttttttttttt")
            
            setSceneState(appearedScene);
            // const nullOr1:number = Math.floor(Math.random()*4)
            // const nullOr2:number = Math.floor(Math.random()*4)
            // const nullOr3:number = Math.floor(Math.random()*4)
            // setEnemy1(nullOr1===2?randomize(enemyArr):null)
            // setEnemy2(nullOr2===2?randomize(enemyArr):null)
            // setEnemy3(nullOr3===2?randomize(enemyArr):null)
            
            // if(nullOr1===2&&nullOr2===2&&nullOr3===2)setEnemy2(randomize(enemyArr));

            fetch("http://localhost:8080/enemy/create", {
                method:"GET",
                headers: {"Content-Type":"application/json"} 
            }).then(async response=>{
                if(!response.ok){
                    if(response.status === 400) setError("incorrect password")
                    else if(response.status === 404)setError("user doesnot exist")
                    else setError("Something went wrong :<")
                }else{
                    const data = await response.json();
                    console.log(data)
                    setEnemy1(enemyArr.filter(e=>e.type.name === data.enemy1.name))
                    createEnemyDispatch(createEnemy1(data.enemy1))
                    setEnemy1max(data.enemy1.hp)
                    setEnemy2(enemyArr.filter(e=>e.type.name === data.enemy2.name))
                    createEnemyDispatch(createEnemy2(data.enemy2))
                    setEnemy2max(data.enemy2.hp)
                    setEnemy3(enemyArr.filter(e=>e.type.name === data.enemy3.name))
                    createEnemyDispatch(createEnemy3(data.enemy3))
                    setEnemy3max(data.enemy3.hp)
                    
                }
            })
        })
    },[socket])

    useEffect(()=>{enemy1max=enemy1Selector.hp},[enemy1])
    useEffect(()=>{enemy2max=enemy2Selector.hp},[enemy2])
    useEffect(()=>{enemy3max=enemy3Selector.hp},[enemy3])

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

    let enemyArr = [<Genkiman/>,<Hentaiyou/>]
    console.log(enemyArr[0].type.name)
    const randomize=(myArray:JSX.Element[])=> {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }
    // console.log(enemy1Selector, enemy2Selector, enemy3Selector)
    console.log(dragX.get(),dragY.get())
    return ( 

        <>
            
            
            <motion.div className={styles.battleBox} 
                variants = {variant}
                transition = {{delay:2, duration:2}}
                animate = {isEncount?"show":"hidden"}
                
                >
                

                    <div className={styles.innnerBattleBox}>
                        <div className={styles.enemeyField}>
                            <motion.div className={styles.fieldEach} 
                                animate={enemy1Selector.hp<0?{opacity:0}:{opacity:1}}>
                                <div style={{display:"flex",justifyContent:"space-between", width:400, height:40,}}>
                                    <div className={styles.enemyName}>{enemy1Selector.name}:</div>
                                    <div style={{
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        
                                        width:"60%",
                                        height:"70%",
                                        background:`linear-gradient(to left, black ${(1-enemy1Selector.hp/enemy1max)*100}%, red ${(1-enemy1Selector.hp/enemy1max)*100}% ${enemy1Selector.hp/enemy1max*100}%)`,
                                        borderRadius:"10px",
                                        border:"solid white 5px"
                                    }}></div>
                                    
                                </div>
                                <motion.div animate={dragX.get()<400&&dragY.get()<400?{border:"solid 5px red", borderRadius:"20px"}:{}}>
                                    {enemy1}
                                </motion.div>
                                
                            </motion.div>
                            <motion.div className={styles.fieldEach} animate={enemy2Selector.hp<0?{opacity:0}:{opacity:1}}>
                            <div style={{display:"flex",justifyContent:"space-between", width:400, height:40,}}>
                                    <div className={styles.enemyName}>{enemy1Selector.name}:</div>
                                    <div style={{
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        
                                        width:"60%",
                                        height:"70%",
                                        background:`linear-gradient(to left, black ${(1-enemy2Selector.hp/enemy2max)*100}%, red ${(1-enemy2Selector.hp/enemy2max)*100}% ${enemy2Selector.hp/enemy2max*100}%)`,
                                        borderRadius:"10px",
                                        border:"solid white 5px"
                                    }}></div>
                                    
                                </div>
                                {enemy2}
                            </motion.div>
                            <motion.div className={styles.fieldEach} animate={enemy3Selector.hp<0?{opacity:0}:{opacity:1}}>
                            <div style={{display:"flex",justifyContent:"space-between", width:400, height:40,}}>
                                <div className={styles.enemyName}>{enemy1Selector.name}:</div>
                                    <div style={{
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        
                                        width:"60%",
                                        height:"70%",
                                        background:`linear-gradient(to left, black ${(1-enemy3Selector.hp/enemy3max)*100}%, red ${(1-enemy3Selector.hp/enemy3max)*100}% ${enemy3Selector.hp/enemy3max*100}%)`,
                                        borderRadius:"10px",
                                        border:"solid white 5px"
                                    }}></div>
                                </div>
                            {enemy3 }
                            
                            </motion.div>
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
                    <button onClick={(e)=>{createEnemyDispatch(atackEnemy1({atack:5}))}}>;alskj</button>
                    <button onClick={(e)=>{createEnemyDispatch(atackEnemy2({atack:5}))}}>;alskj</button>
                    <button onClick={(e)=>{createEnemyDispatch(atackEnemy3({atack:5}))}}>;alskj</button>
                    </div>
                    
            </motion.div>
            
            {/* <motion.div drag className={styles.you}>
                <h1>oi</h1>
            </motion.div> */}
        </>
     );
}

export default Battle;