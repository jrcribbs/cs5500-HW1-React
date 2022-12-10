import React from "react";

const PollVote = () => {
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
    </div>

);
};
export default PollVote;