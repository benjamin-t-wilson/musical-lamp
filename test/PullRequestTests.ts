import server from "../src/server"
import supertest from 'supertest';
const request = supertest(server);

describe("GET /pullrequests/:username/:repo", () => {
    it("should return json", async () => {
        const res = await request.get("/pullrequests/benjamin-t-wilson/musical-lamp");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"))
        expect(res.body).toBeTruthy();
    });

    it("should return a 404 if the repo is invalid", async () => {
        const res = await request.get("/pullrequests/benjamin-t-wilson/thisismostdefinitelynotarealrepo");
        expect(res.status).toEqual(404);
    });

    it("should return a 404 if the username is invalid", async () => {
        const res = await request.get("/pullrequests/thisisprobablynotarealusernamebutIwillconsiderthepossibility/musical-lamp");
        expect(res.status).toEqual(404);
    });

    it("should return 400 + error message if the state query is invalid", async () => {
        const res = await request.get("/pullrequests/benjamin-t-wilson/musical-lamp?state=invalid");
        expect(res.status).toEqual(400);
        expect(res.body.message).toBeTruthy();
    });

    it("should only return states matching the one passed, if passed and valid", async () => {
        const res = await request.get("/pullrequests/benjamin-t-wilson/musical-lamp?state=open");

        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy();

        const pullRequestsThatAreNotOpen = res.body.filter((pullRequest: any) => {
            return pullRequest.state !== "open"
        })

        expect(pullRequestsThatAreNotOpen).toHaveLength(0)
    })

    afterAll(done => {
        server.close();
        done();
    })
})