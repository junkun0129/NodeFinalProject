import * as React from 'react';
import { Component } from 'react';
import { useState, useEffect } from 'react';
import Battle from '../gamecompo/Battle';
import Field, { socketType } from '../gamecompo/Field';
import {motion} from "framer-motion";
import styles from "./Game.module.scss";

function Game({socket}:socketType) {

    const [screenNUm, setScreenNum] = useState(0);


  

    return ( 
        <>
        <div className={styles.gameBox}>

            <Field socket={socket}></Field>
            <Battle socket = {socket}></Battle>
        </div>
        </>
     );
}

export default Game;