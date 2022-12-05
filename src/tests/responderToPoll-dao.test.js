import {createUser, deleteUser, deleteUsersByUsername} from "../services/users-service";
import axios from "axios";
import {createPoll, deletePoll, findAllPolls, findPoll, unvoteOnPoll, voteOnPoll} from "../services/polls-service";

const BASE_URL = "http://localhost:4000" // this only works for local testing
const POLLS_API ="/api/polls"
const USERS_API = `${BASE_URL}/api/users`;

describe ("Create/delete ResponderToPoll after voting/unvoting", () => {
    const testAuthor= {
        username: 'pollTestAuthor',
        password: 'testing',
        email: 'testing@test.com'
    };

    const testResponder = {
        username: 'pollTestResponder',
        password: 'testing',
        email: 'testing2@test.com'
    };


    const testPoll = {
        question : "What is your favorite color?",
        options: ["Red", "Green", "Blue"]

    }
    beforeEach(async () => {
        //delete any existing usernames that are the same
        await deleteUsersByUsername(testAuthor.username)
        await deleteUsersByUsername(testResponder.username)

        // create test user
        let daoResp = await createUser(testAuthor)
        let daoResp2 = await createUser(testResponder)
        testAuthor._id = daoResp.userId
        testResponder._id = daoResp2.userId
    })

    afterEach(async () => {
        // delete the poll
        await deletePoll(testPoll._id)

        // delete users
        await deleteUser(testAuthor._id)
        await deleteUser(testResponder._id)
    })

    test("vote mapping", async () => {
        // create poll by testUser
        let pollDaoResp = await createPoll(testAuthor._id, testPoll)
        testPoll._id = pollDaoResp._id

        // responder user votes on author user's poll
        await voteOnPoll(testPoll._id,testResponder._id,{response : "Red"})

        let daoResp = await findPoll(testPoll._id)

        // TODO put in correct service call here
        let rtpDaoResp = await findResponseToPollByUser(testResponder._id)







        expect(daoResp.answerOptionsCount[0]).toEqual(1)
        expect(daoResp.answerOptionsCount[1]).toEqual(2)
        expect(daoResp.answerOptionsCount[2]).toEqual(3)
    })

    test("unvoting mechanism", async () => {
        // create poll by testUser
        let pollDaoResp = await createPoll(testUser._id, testPoll)
        testPoll._id = pollDaoResp._id

        await voteOnPoll(testPoll._id,testUser._id,{response : "Red"})
        await voteOnPoll(testPoll._id,testUser._id,{response : "Red"})

        await voteOnPoll(testPoll._id,testUser._id,{response : "Green"})
        await voteOnPoll(testPoll._id,testUser._id,{response : "Green"})
        await voteOnPoll(testPoll._id,testUser._id,{response : "Green"})
        await voteOnPoll(testPoll._id,testUser._id,{response : "Green"})
        await voteOnPoll(testPoll._id,testUser._id,{response : "Green"})

        await voteOnPoll(testPoll._id,testUser._id,{response : "Blue"})

        await unvoteOnPoll(testPoll._id,testUser._id,{response : "Red"})
        await unvoteOnPoll(testPoll._id,testUser._id,{response : "Blue"})
        await unvoteOnPoll(testPoll._id,testUser._id,{response : "Green"})
        await unvoteOnPoll(testPoll._id,testUser._id,{response : "Green"})

        let daoResp = await findPoll(testPoll._id)

        expect(daoResp.answerOptionsCount[0]).toEqual(1)
        expect(daoResp.answerOptionsCount[1]).toEqual(3)
        expect(daoResp.answerOptionsCount[2]).toEqual(0)
    })
})