import { useState } from "react";

import "./App.css";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/buttons/ButtonBox";
import Button from "./components/buttons/Button";

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
    const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

    const resetClickHandler = (e) => {
        e.preventDefault();
        setCalc({ sign: "", num: 0, res: 0 });
    };

    const invertClickHandler = (e) => {
        e.preventDefault();
        setCalc({ ...calc, num: calc.num ? calc.num * -1 : 0, res: calc.res ? calc.res * -1 : 0 });
    };

    const percentClickHandler = (e) => {
        e.preventDefault();
        setCalc({ ...calc, num: calc.num / 100, res: calc.res / Math.pow(100, 1) });

        console.log("percent");
    };

    const equalsClickHandler = (e) => {
        e.preventDefault();

        if (calc.num === 0 && calc.sign === "/") {
            console.log("Yeah");
        }
        if (calc.sign) {
            setCalc({
                sign: "",
                num: 0,
                res:
                    calc.sign === "+"
                        ? calc.res + +calc.num
                        : calc.sign === "-"
                        ? calc.res - +calc.num
                        : calc.sign === "/" && calc.num === 0
                        ? "cant divide by 0"
                        : calc.sign === "/"
                        ? calc.res / +calc.num
                        : calc.res * +calc.num,
            });
        }
        console.log(calc);
    };
    const signClickHandler = (e) => {
        e.preventDefault();

        const value = e.target.textContent;
        setCalc({
            ...calc,
            sign: value,
            num: 0,
            res: !calc.res && calc.num ? +calc.num : +calc.res,
        });
    };
    const commaClickHandler = (e) => {
        e.preventDefault();

        if (calc.num === 0) {
            setCalc({ ...calc, num: "0." });
        } else if (!String(calc.num).includes(".")) {
            setCalc({ ...calc, num: +calc.num + "." });
        }
    };
    const numClickHandler = (e) => {
        e.preventDefault();

        const value = e.target.textContent;

        console.log(String(calc.num));
        if (String(calc.num).length < 16) {
            console.log(calc.num);
            setCalc({
                ...calc,
                num: String(calc.num) === "0" ? +value : calc.num + String(value),
                res: !calc.sign ? 0 : +calc.res,
            });
        }

        // My Solution
        // if (calc.num === 0 && value !== 0) {
        //     setCalc({
        //         ...calc,
        //         num: value,
        //         res: !calc.sign ? 0 : calc.res,
        //     });
        // } else if (calc.num.length < 16) {
        //     setCalc({
        //         ...calc,
        //         num: calc.num + value,
        //         res: !calc.sign ? 0 : calc.res,
        //     });
        // }
    };
    const buttons = btnValues
        .flat()
        .map((btnVal, i) => (
            <Button
                key={i}
                value={btnVal}
                className={btnVal === "=" ? "equals" : ""}
                onClick={
                    btnVal === "C"
                        ? resetClickHandler
                        : btnVal === "+-"
                        ? invertClickHandler
                        : btnVal === "%"
                        ? percentClickHandler
                        : btnVal === "="
                        ? equalsClickHandler
                        : btnVal === "/" || btnVal === "X" || btnVal === "-" || btnVal === "+"
                        ? signClickHandler
                        : btnVal === "."
                        ? commaClickHandler
                        : numClickHandler
                }
            />
        ));
    return (
        <Wrapper>
            <Screen value={calc.num ? toLocaleString(calc.num) : toLocaleString(calc.res)} />
            <ButtonBox>{buttons}</ButtonBox>
        </Wrapper>
    );
}

export default App;
