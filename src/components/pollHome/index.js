import React, {useEffect, useState} from "react";
import Polls from "../polls";
import * as service from "../../services/polls-service";
import {useLocation, useParams} from "react-router-dom";

const PollHome = () => {
    const location = useLocation();
    const {pid} = useParams();
    const [polls, setPolls] = useState([]);
    const [poll, setPoll] = useState('');
    let pollId = pid;
    const find = () => {
        if(pid) {
            return service.findPoll(pid)
                .then(polls => setPolls(polls))
        } else {
            return service.findAllPolls()
                .then(polls => setPolls(polls))
        }
    }
    useEffect(() => {
        let isMounted = true;
        find()
        return () => {isMounted = false;}
    }, []);
    const createPoll = () =>
        service.createPoll(pollId, {poll})
            .then(find)
    const deletePoll = (pollid) =>
        service.deletePoll(pollid)
            .then(find)
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
                            <a onClick={createPoll}
                               className={`btn btn-primary btn-lg rounded-pill fa-pull-left
                                                    fw-bold ps-4 pe-4`}>
                                Poll
                            </a>
                        </div>
                        </div>

                    </div>
                }
            </div>
            <Polls polls={polls} deletePoll={deletePoll()}/>
        </div>

);
};
export default PollHome;