import React from "react";
const Polls = () => {
    return(
        <h1>My Polls</h1>
    );
};
export default Polls;

/*
import React from "react";
import Polls from "../polls";
import * as service from "../../services/polls-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {deletePoll, findAllPolls, findPoll} from "../../services/polls-service";

const MyPolls = () => {
    // const location = useLocation();
    const {uid} = useParams();
    const [polls, setPolls] = useState([]);
    const [poll, setPoll] = useState('');
    const userId = uid;
    const findPolls = () => {
        if(uid) {
            return service.findPoll(uid)
                .then(polls => setPolls(polls))
        } else {
            return service.findAllPolls()
                .then(polls => setPolls(polls))
        }
    }
    useEffect(() => {
        let isMounted = true;
        findPolls()
        return () => {isMounted = false;}
    }, []);
    const createPoll = () =>
        service.createPoll(userId, {polls})
            .then(findPolls())
    const deletePoll = (pollid) =>
        service.deletePoll(pollid)
            .then(findPolls)
    return(
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Poll Screen</h4>
                {
                    uid &&
                    <div className="d-flex">
                        <div className="p-2">
                            <img className="ttr-width-50px rounded-circle"
                                 src="../images/nasa-logo.jpg"/>
                        </div>
                        <div className="p-2 w-100">
              <textarea
                  onChange={(e) =>
                      setPoll(e.target.value)}
                  placeholder="What's happening?"
                  className="w-100 border-0"></textarea>
                            <div className="row">
                                <div className="col-10 ttr-font-size-150pc text-primary">
                                    <i className="fas fa-portrait me-3"></i>
                                    <i className="far fa-gif me-3"></i>
                                    <i className="far fa-bar-chart me-3"></i>
                                    <i className="far fa-face-smile me-3"></i>
                                    <i className="far fa-calendar me-3"></i>
                                    <i className="far fa-map-location me-3"></i>
                                </div>
                                <div className="col-2">
                                    <a onClick={createPoll}
                                       className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                                        Polls
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Polls polls={polls} deleteTuit={deletePoll()}/>
        </div>
    );
};
export default MyPolls;*/