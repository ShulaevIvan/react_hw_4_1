import React from 'react';
import { useState } from 'react';
import { useRef } from 'react'
import _ from "lodash";


const Converter = () => {
    const color = useRef('ffffff');
    const basicInput = useRef('');
    const resultInput = useRef('');
    const [backgroundColor, setBackgroundColor] = useState({color: color.current});  
    const delay500 = _.debounce((value) => hex2rgb(value), 500);

    const formHandler = (e) => {
        e.preventDefault();
        basicInput.current.value = e.target.value;
        if (basicInput.current.value.replace('#', '').split('').length < 6) return;
        color.current = basicInput.current.value;
        delay500(color.current);
    }
    const hex2rgb = (hexValue) => {
        if (hexValue.split('')[0] !== '#') hexValue = `#${hexValue}`
        const red = parseInt(hexValue.slice(1, 3), 16);
        const green = parseInt(hexValue.slice(3, 5), 16);
        const blue = parseInt(hexValue.slice(5, 7), 16);

        const result = [ red, green, blue ];
        resultInput.current.value = `${red} ${green} ${blue}`;
        color.current = hexValue;
        
        setBackgroundColor({
            color: color.current,
        });

        return result;
    }

    return (
        <React.Fragment>
            {console.log(backgroundColor.color)}
            <div className="app-converter-background" style={{background:backgroundColor.color}}>
                <div className="input-converter-wrap">
                    <label htmlFor="converter-input"></label>
                    <input ref={basicInput} id="converter-input" type="text" placeholder="hex" autoComplete='off' onChange={formHandler}></input>
                </div>
                <div className="input-converter-result-wrap">
                    <label htmlFor="converter-input-result"></label>
                    <input ref={resultInput} id="converter-input-result" placeholder="rgb"></input>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Converter;