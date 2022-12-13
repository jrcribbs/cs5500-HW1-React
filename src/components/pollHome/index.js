import React, {useEffect, useState} from "react";
import Polls from "../polls";
import * as service from "../../services/polls-service";
import {useLocation, useParams} from "react-router-dom";
import {createPoll, findAllPolls} from "../../services/polls-service";
import Poll from "../polls/Poll";
import {findUserById} from "../../services/users-service";

const PollHome = () => {
    const location = useLocation();
    const {pid} = useParams();
    const [polls, setPolls] = useState([]);
    const [poll, setPoll] = useState('')
    const [uQuestion, setQuestion] = useState('');
    const [uOptions, setOptions] = useState('');
    let pollId = pid;
//
    // const find = async () => {
    //     //enforce get all polls
    //     // let newVar = false
    //     // if(newVar == true) {
    //     //     return service.findPoll(pid)
    //     //         .then(polls => setPolls(polls))
    //     // } else {
    //     //     return service.findAllPolls()
    //     //         .then(polls => setPolls(polls))
    //     // }
    //     const allPollsFound = await findAllPolls()
    //     setPolls(allPollsFound)
    //     alert(allPollsFound.length)
    // }
    //
    // useEffect( async () => {
    //     const allPollsFound = await findAllPolls()
    //     setPolls(allPollsFound)
    //     alert(allPollsFound.length)
    // }, []);

    const placeholder = () => {
        alert("hello")
    }

    const find = async() => {
        const allPollsFound = await findAllPolls()
        setPolls(allPollsFound)
    }

    const findOne = async() => {
        const allPollsFound = await findAllPolls()
        setPoll(allPollsFound[0])
    }

    useEffect(find, [])
    useEffect(findOne, null)

    // function processInput(question, options) {
    //     console.log(question, options)
    //     var poll = {
    //         question: processInput(document.getElementById('question').value, document.getElementById('options').value),
    //         options: options,
    //         optionCount:[options.length],
    //         author: findUserById("634466e38306079e670e180d")
    //
    //     };
    //
    //     createPoll()
    // }

    // const createPoll = () => {
    //     const poll = {
    //                 question: question,
    //                 options: options,
    //                 optionCount:[options.length],
    //                 author: findUserById("634466e38306079e670e180d")
    //     }
    //     return service.createPoll(pollId, {poll})
    //         .then(find)
    // }


    //
    // const deletePoll = (pollid) => {
    //     return
    //     service.deletePoll(pollid)
    //         .then(find)

    // <Poll poll={poll}/>
    // }

    /**
     * this method converts user input into a JSON object, which is then
     * directly sent to our api
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        const optionsArray = uOptions.split(",");
        const optionCount = [].fill.call({ length: optionsArray.length }, 0) // initialize optioncount array to be 0s of length options
        const author = findUserById("634466e38306079e670e180d")
        const poll = {
            question: uQuestion,
            options: optionsArray,
            optionCount: optionCount,
            author: author
        };

        fetch("http://localhost:4000/api/polls/users/634466e38306079e670e180d", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(poll)
        }).then(() => {
            console.log("new poll added")
        })
        window.location.reload() // refreshing page to display newly created poll
    }

    return(
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Create Polls</h4>
                <form onSubmit={handleSubmit}>
                    <label>Enter your poll prompt:</label>
                    <input
                        type="text"
                        required value={uQuestion}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <label>Enter your poll options, separated by comma:</label>
                    <input
                        type="text"
                        required value={uOptions}
                        onChange={(e) => setOptions(e.target.value)}
                    />


                <div className="col-2">
                    <button><a className={`btn btn-primary btn-lg rounded-pill fa-pull-left
                                                    fw-bold ps-4 pe-4`}>
                        Poll
                    </a></button>
                </div>
                </form>
            </div>

            <p>
                {uQuestion}
                {uOptions}
            </p>

            <Polls polls={polls}/>


        </div>

);
};
export default PollHome;