import React from 'react';
import { useState } from 'react';
import { useRef } from 'react'
import _ from "lodash";


const Converter = () => {
    const color = useRef('ffffff');
    const basicInput = useRef('');
    const resultInput = useRef('');
    const patternCheckHex = /^#(([0-9A-Fa-f]{2}){3,4}|[0-9A-Fa-f]{3,4})$/;
    const [backgroundColor, setBackgroundColor] = useState({color: color.current});

    const delay500 = _.debounce((value) => hex2rgb(value), 500);
    const delayError = _.debounce((value) => errorBg(value), 500);

    const formHandler = (e) => {
        e.preventDefault();
        basicInput.current.value = e.target.value.trim()
        const checkHex = patternCheckHex.test(`${basicInput.current.value}`);
        const checkHexLength = basicInput.current.value.trim().replace('#', '').length;

        if (checkHexLength >= 6 && !checkHex) {
            color.current = '#873D3D';
            resultInput.current.value = '';
            delayError(color.current)
        }
        else if (checkHex && checkHexLength === 6) {
            color.current = basicInput.current.value;
            delay500(color.current);
        }
    }

    const hex2rgb = (hexValue) => {
        const red = parseInt(hexValue.slice(1, 3), 16);
        const green = parseInt(hexValue.slice(3, 5), 16);
        const blue = parseInt(hexValue.slice(5, 7), 16);

        if (!isNaN(red) && !isNaN(green) && !isNaN(blue)) {
            const result = [ red, green, blue ];
            resultInput.current.value = `rgb (${red},${green},${blue})`;
            color.current = hexValue;
            setBackgroundColor({ color: color.current, });
            return result;
        }
    }

    const clearInputHandler = () => {
        basicInput.current.value = '';
        resultInput.current.value = '';
        color.current = '#fff';
        setBackgroundColor({ color: color.current, });
    }

    const errorBg = (value) => {
        setBackgroundColor({ color: color.current, });
        resultInput.current.value = 'Ошибка';
    }

    return (
        <React.Fragment>
            <div className="app-converter-background" style={{background:backgroundColor.color}}>
                <div className="input-converter-wrap">
                    <label htmlFor="converter-input"></label>
                    <input ref={basicInput} 
                        id="converter-input" 
                        type="text" 
                        placeholder="hex" 
                        autoComplete='off' 
                        onChange={formHandler} 
                        onClick={clearInputHandler}>
                    </input>
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