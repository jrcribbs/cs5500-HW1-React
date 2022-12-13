import React, {useEffect, useState} from "react";
import Polls from "../polls";
import polls from "../polls";
import Poll from "../polls/Poll";
import poll from "../polls/Poll";
import {
  findAllPolls,
  unvoteOnPoll,
  voteOnPoll
} from "../../services/polls-service";
import {findUserById} from "../../services/users-service";

const PollVote = () => {
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState("")
  const [uResponse, setResponse] = useState("")

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

  function handleSubmit () {
    const pollID = "638cf327d81e81961231ffdb";
    const userID = "634466e38306079e670e180d";
    const vote = {
      response: uResponse
    };

    // voteOnPoll(pollID, userID, vote).then(r => console.log("voted"))


    fetch("http://localhost:4000/api/polls/vote/638cf327d81e81961231ffdb/users/634466e38306079e670e180d", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(vote)
    }).then(() => {
      console.log("new poll added")
    })

  }

  function unVote () {
    const pollID = "638cf327d81e81961231ffdb";
    const userID = "634466e38306079e670e180d";
    const vote = {
      response: uResponse
    };

    // unvoteOnPoll(pollID, userID, vote).then(r => console.log("unvoted for " + uResponse))

    fetch("http://localhost:4000/api/polls/unvote/638cf327d81e81961231ffdb/users/634466e38306079e670e180d", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(vote)
    }).then(() => {
      console.log("unvoted for " + uResponse)
    })

  }

  return(
      <div id="poll-container">
        <form>
          <label>Whats your favorite color?</label><hr></hr>
          <input type="radio"  name="poll-option" id="option-1" value="Red"
                 onChange={(e) => setResponse(e.target.value)} ></input>
            <label for="option-1">Red</label><hr></hr>
            <input type="radio" name="poll-option" id="option-2" value="Green"
                   onChange={(e) => setResponse(e.target.value)}></input>
              <label for="option-2">Green</label><hr></hr>
              <input type="radio" name="poll-option" id="option-3" value="Blue"
                     onChange={(e) => setResponse(e.target.value)}></input>
                <label for="option-3">Blue</label><hr></hr>
                <button onClick={() => handleSubmit()}>Vote</button><hr></hr>
                <button onClick={() => unVote()} >Unvote</button><hr></hr>

        </form>
        <div id="results-container"></div>
        <Poll poll={poll}/>
        {uResponse}
    </div>


);
};
export default PollVote;