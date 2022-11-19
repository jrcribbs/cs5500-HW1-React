import {
  createTuitByUser, deleteTuit,
    findTuitById, findAllTuits
} from "../services/tuits-service";
import {
  createUser,
} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // sample user
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  }
  // sample tuit
  const tuit = {
    tuit: "test tuit",
    postedBy: ripley
  };

  // setup test before running test
  beforeAll(() => {
    // remove any/all tuits to make sure we create it in the test
    return deleteTuit(tuit._id);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteTuit(tuit._id);
  })
  test('can insert new users with REST API', async () => {
  const newUser = await createUser(ripley);
  const newTuit = await createTuitByUser(newUser._id, tuit)

  // verify inserted user's properties match parameter user
  expect(newTuit.tuit).toEqual(tuit.tuit);
  expect(newTuit.postedBy).toEqual(ripley);
  });
});

describe('can delete tuit with REST API', () => {

  // sample user for tuit
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  }
  // sample tuit to delete
  const tuit = {
    tuit: "test tuit",
    postedBy: ripley
  };

  // setup the tests before verification
  beforeAll(() => {
    // insert the sample tuit we then try to remove
    const user = createUser(ripley);
    return createTuitByUser(user._id, tuit);
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteTuit(tuit._id);
  })

  test('can delete users from REST API by username', async () => {
    // delete a tuit by id. Assumes user already exists
    const status = await deleteTuit(tuit._id);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // sample user for tuit
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  }
  // sample tuit to delete
  const tuit = {
    tuit: "test tuit",
    postedBy: ripley
  };

  // setup the tests before verification
  beforeAll(() => {
    // insert the sample tuit we then try to remove
    const user = createUser(ripley);
    return createTuitByUser(user._id, tuit);
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteTuit(tuit._id);
  })

  test('can retrieve tuit from REST API by primary key', async () => {
    // insert the user in the database
    const newUser = await createUser(ripley);
    const newTuit = await createTuitByUser(newUser._id, tuit)

    // verify inserted tuits's properties match parameter tuit
    expect(newTuit.tuit).toEqual(tuit.tuit);
    expect(newTuit.postedBy).toEqual(ripley);

    // retrieve the user from the database by its primary key
    const existingTuit = await findTuitById(newTuit._id);

    // verify retrieved user matches parameter user
    expect(existingTuit.tuit).toEqual(tuit.tuit);
    expect(existingTuit.postedBy).toEqual(ripley);
  })
});

describe('can retrieve all tuits with REST API', () => {
  // sample tuits we'll insert to then retrieve
  const tuits = [
    "tuit1", "tuit2", "tuit3"
  ];
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  // setup data before test
  beforeAll(() =>
      // insert several known users
      tuits.map(tuit =>
          createTuitByUser({
            tuit,
            postedBy: createUser(ripley)
          })
      )
  );

  // clean up after ourselves
  afterAll(() =>
      // delete the users we inserted
      tuits.map(tuit =>
          deleteTuit(tuit._id)
      )
  );

  test('can retrieve all tuits from REST API', async () => {
    // retrieve all the tuits
    const tuits = await findAllTuits();

    // there should be a minimum number of tuits
    expect(tuits.length).toBeGreaterThanOrEqual(tuits.length);

    // let's check each tuit we inserted
    const tuitsWeInserted = tuits.filter(
        tuit => tuits.indexOf(tuit.tuit) >= 0);

    // compare the actual tuits in database with the ones we sent
    tuitsWeInserted.forEach(tuit => {
      const t = tuits.find(t => t === tuit.tuit);
      expect(t.tuit).toEqual(tuit);
      expect(t.postedBy).toEqual(ripley);
    });
  });
});