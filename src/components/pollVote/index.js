import React, {useEffect, useState} from "react";

import {findAllPolls} from "../../services/polls-service";
import Poll from "../polls/Poll";

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

  // function buildPollForm() {
  //
  //   var q = poll["question"]
  //   var options = poll["options"]
  //
  //   var form = document.createElement("form");
  //
  //   var heading = document.createElement("h1");
  //
  //   heading.innerHTML = q;
  //   form.appendChild(heading)
  //
  //   for (var i = 0; i < options.length; i++) {
  //     var option = options[i]
  //     var radioButton = document.createElement("input");
  //     radioButton.type = "radio";
  //     radioButton.name = "option";
  //     radioButton.value = option;
  //     form.appendChild(radioButton)
  //
  //     var label = document.createElement('label');
  //     label.innerHTML = option;
  //     form.appendChild(label);
  //   }
  //
  //   return form.outerHTML
  //
  // }

  useEffect(find, [])
  useEffect(findOne, null)

 // var html = buildPollForm()


  return( "hello"
  );
};
export default PollVote;


//   return(
//       <div id="poll-container">
//         <form>
//           <label>Poll prompt</label><hr></hr>
//           <input type="radio" name="poll-option" id="option-1" value="Option 1"></input>
//             <label for="option-1">Option 1</label><hr></hr>
//             <input type="radio" name="poll-option" id="option-2" value="Option 2"></input>
//               <label for="option-2">Option 2</label><hr></hr>
//               <input type="radio" name="poll-option" id="option-3" value="Option 3"></input>
//                 <label for="option-3">Option 3</label><hr></hr>
//                 <button type="submit">Submit</button><hr></hr>
//         </form>
//         <div id="results-container"></div>
//         <Polls polls={polls}/>
//         <Poll poll={poll}/>
//     </div>
//
//
// );
