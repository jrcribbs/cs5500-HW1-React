import React from "react";

const Poll = ({poll, deletePoll}) => {
    return(
        <div className="w-100">
            <h2
                className="fs-5"> {poll.author && poll.author.username}
            </h2>
            {poll.pollContent}
                {poll.question}
                {poll.options}
        </div>)

};
export default Poll;