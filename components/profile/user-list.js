import React from "react";
import {Link} from "react-router-dom";

export const UserList = ({users, deleteUser}) => {
  return (
    <div className="list-group">
      {
        users.map(user => {
          return (
            <Link className="list-group-item"
                  key={"634466e38306079e670e180d"}
                  to={`/home/634466e38306079e670e180d`}>
          <span className="fs-3">
            {user.username}
          </span>
              <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                deleteUser("634466e38306079e670e180d")
              }} className="btn btn-danger fa-pull-right">
                <i className="fas fa-remove"></i>
              </button>
            </Link>
          )
        })
      }
    </div>)
};
