import React, {useEffect, useState} from "react";
import Polls from "../polls";
import * as service from "../../services/polls-service";
import {useLocation, useParams} from "react-router-dom";
import {findAllPolls} from "../../services/polls-service";

const PollHome = () => {
    const location = useLocation();
    const userId = "634466e38306079e670e180d";
    const [polls, setPolls] = useState([]);
    const [poll, setPoll] = useState('');

    const find = async () => {
        if(userId) {
            return service.findPoll(userId)
                .then(polls => setPolls(polls))
        } else {
            return service.findAllPolls()
                .then(polls => setPolls(polls))
        }
    }
    useEffect(find, [])
    window.onload=function (){
        document.getElementById("qPrompt").onkeyup=function (){
            document.getElementById("test").innerHTML = this.value;
        }
        document.getElementById("answers").onkeyup=function (){
            document.getElementById("test2").innerHTML = this.value;
        }
    }
    const createPoll = () => {
        service.createPoll(userId, {poll})
            .then(find)
    }
    return(
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Create Polls</h4>
                {
                    <div class="poll-container">
                        <div className="row">
                            <label>Prompt:</label>
                            <input id="qPrompt"/>
                            <span id="test">xxx</span>
                            <label>Answers:</label>
                            <input id="answers"/>
                            <span id="test2">xxx</span>
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
            <Polls polls={polls}/>
        </div>

);
};
export default PollHome;