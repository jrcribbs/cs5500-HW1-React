import React, {useEffect, useState} from "react";
import Polls from "../polls";
import polls from "../polls";
import Poll from "../polls/Poll";
import poll from "../polls/Poll";
import {findAllPolls} from "../../services/polls-service";

const PollVote = () => {
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState("")

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

  return(
      <div id="poll-container">
        <form>
          <label>Poll prompt</label><hr></hr>
          <input type="radio" name="poll-option" id="option-1" value="Option 1"></input>
            <label for="option-1">Option 1</label><hr></hr>
            <input type="radio" name="poll-option" id="option-2" value="Option 2"></input>
              <label for="option-2">Option 2</label><hr></hr>
              <input type="radio" name="poll-option" id="option-3" value="Option 3"></input>
                <label for="option-3">Option 3</label><hr></hr>
                <button type="submit">Submit</button><hr></hr>
        </form>
        <div id="results-container"></div>
        <Polls polls={polls}/>
        <Poll poll={poll}/>
    </div>


);
};
export default PollVote;