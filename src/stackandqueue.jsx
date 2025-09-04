import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from "react-router-dom";
import dictionary from './assets/dictionary.json'

function Stackandqueue() {
    const [stack, setStack] = useState([])
    const [queue, setQueue] = useState([])
    const [wordindex, setWordIndex] = useState(Math.floor(Math.random() * dictionary.length))
    const [showNext, setShowNext] = useState(false)
    const [showHowToPlay, setShowHowToPlay] = useState(false)

    // initialise with random word from dictionary
    useEffect(() => {
        const word = dictionary[wordindex].word
        setStack([])
        setQueue(dictionary[wordindex].scramble.split(""))
    }, [wordindex])

    const handleSubmit = () => {
        setShowNext((queue.join() == dictionary[wordindex].word.split("")) || (stack.join() == dictionary[wordindex].word.split("")))
    }

    

    useEffect(() => {
        handleSubmit();
    }, [stack, queue]);
    const handleReset = (e) => {
        setStack([])
        setQueue(dictionary[wordindex].scramble.split(""))
    }

    const handleStackButton = (e) => {
        if (stack.length > 0) {
            setQueue([...queue, stack[0]])
            setStack(stack.slice(1))

        }
    }

    const handleQueueButton = (e) => {
        if (queue.length > 0) {
            setStack([queue[0], ...stack])
            setQueue(queue.slice(1))

        }
    }

    const handleKeyUp = (e) => {
        if (e.key === 'ArrowUp') {
            handleStackButton()
        }
        if (e.key === 'ArrowLeft') {
            handleQueueButton()
        }
    }

    return (
        <div onKeyUp={handleKeyUp} tabIndex={0}>

            <h2>Quack</h2>
            <button onClick={() => setShowHowToPlay(!showHowToPlay)}>How To Play?</button>
            {
                showHowToPlay ?
                    <p>
                        Unscramble the word that matches the definition by moving letters between the stack and the queue using the up arrow (stack to queue), and the left arrow (queue to stack). Click the arrows or use the keyboard to play!
                    </p>
                    : null
            }
            <p>
                <b>Definition</b>: {dictionary[wordindex].hint}
            </p>
            <button onClick={() => alert(JSON.stringify(dictionary[wordindex]))}>Debug</button>
            {
                // ["t","h","e","g","r","i","n","c","h"] .map(value => ({ value, sort: Math.random() }))
                // .sort((a, b) => a.sort - b.sort)
                // .map(({ value }) => value).map((s, i) => {
                // return s;
                // })
            }
            <div className="sq-container">
                <div className="sqleft">
                    <h3>Stack</h3>
                    <div className="word">
                        {
                            stack.map((v, i) => {
                                return (<div className="letter" key={i}>{v}</div>);
                            })
                        }
                    </div>
                    <button onClick={handleStackButton}>&uarr;</button>
                </div>
                <div className="sqright">
                    <h3>Queue</h3>
                    <div className="word">
                        {
                            queue.map((v, i) => {
                                return (<div className="letter" key={i}>{v}</div>);
                            })
                        }
                    </div>
                    <button onClick={handleQueueButton}>&larr;</button>
                </div>
            </div>
            <div className="buttonsection">
                <button className="submit" onClick={handleSubmit}>Submit</button>
                <button className="reset" onClick={handleReset}>Reset</button>
            </div>
            <div>
                {
                    showNext ?
                        <div>
                            <h2>Well done!</h2>
                            <button onClick={() => setWordIndex(Math.floor(Math.random() * dictionary.length))}>New Word!</button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default Stackandqueue