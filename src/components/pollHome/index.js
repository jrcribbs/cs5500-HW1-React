import React, {useEffect, useState} from "react";
import Polls from "../polls";
import * as service from "../../services/polls-service";
import {useLocation, useParams} from "react-router-dom";
import {findAllPolls} from "../../services/polls-service";

const PollHome = () => {
    const location = useLocation();
    const {pid} = useParams();
    const [polls, setPolls] = useState([]);
    const [poll, setPoll] = useState('');
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

    useEffect(find, [])

    // const createPoll = () => {
    //     return
    //     service.createPoll(pollId, {poll})
    //         .then(find)
    // }
    //
    // const deletePoll = (pollid) => {
    //     return
    //     service.deletePoll(pollid)
    //         .then(find)
    // }
    return(
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Create Polls</h4>
                {
                    <div class="poll-container">
                        <div className="row">
                        <form>
                            <h3>Please enter your question:</h3>
                            <input type="text" name ="prompt"></input><hr></hr>
                            <h3>Please enter your question, seperated by commas:</h3>
                            <input type="text" name ="prompt"></input><hr></hr>
                        </form>
                        <div className="col-2">
                            <a onClick={placeholder}
                               className={`btn btn-primary btn-lg rounded-pill fa-pull-left
                                                    fw-bold ps-4 pe-4`}>
                                Poll
                            </a>
                        </div>
                        </div>

                    </div>
                }
            </div>
            <Polls polls={polls}/>
        </div>

);
};
export default PollHome;