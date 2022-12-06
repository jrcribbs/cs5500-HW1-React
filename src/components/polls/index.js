import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findAllPolls, findPoll} from "../../services/polls-service";
import * as service from "../../services/polls-service";
import * as PropTypes from "prop-types";

function Polls(props) {
    return null;
}

Polls.propTypes = {
    polls: PropTypes.arrayOf(PropTypes.any),
    deleteTuit: PropTypes.func
};
const MyPolls = () => {
    return(
        <h1>My Polls</h1>
    );
    const location = useLocation();
    const {poid} = useParams();
    const [polls, setPolls] = useState([]);
    const [poll, setPoll] = useState('');
    const pollid = poid;

    const findPolls = async () => {
        let allPolls;

        if(pollid) {
            allPolls = await findPoll(poid)
            setPolls(allPolls)
        } else {
            allPolls = await findAllPolls()
            setPolls(allPolls)
        }
    }

    useEffect(() => {
        let isMounted = true;
        try
        {
            findPolls()
        }
        catch(e) {
            alert(e)
        }
        return () => {isMounted = false;}
    }, []);

    const createPoll = () =>
        service.createPoll(pollid, {poll})
            .then(findPolls)
    const deletePoll = (tid) =>
        service.deletePoll(tid)
            .then(findPolls)
    return(
        <div className="ttr-home">
            <Polls polls={polls} deletePoll={deletePoll}/>
        </div>
    );
};

export default MyPolls;