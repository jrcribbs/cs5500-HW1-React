import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <UserList tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const user = screen.getByText(/alice/i);
  const tuit = screen.getByText(/alice's tuit/i);
  expect(user).toBeInTheDocument();
  expect(tuit).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <UserList tuits={tuits}/>
      </HashRouter>);
  const tuit = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
})

jest.mock('axios');

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
      Promise.resolve({ data: {users: MOCKED_USERS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <UserList tuits={tuits}/>
      </HashRouter>);

  const user = screen.getByText(/alice's tuit/i);
  expect(user).toBeInTheDocument();
});
