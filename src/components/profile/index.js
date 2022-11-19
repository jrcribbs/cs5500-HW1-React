import * as service from "../../services/auth-service"
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

const Profile = () => {
  const navigate = useHistory();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate.push('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
    .then(() => navigate.push('/login'));
  }
  return(
      <div>
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
        <button onClick={logout}>
          Logout</button>
      </div>
  );
};
export default Profile;