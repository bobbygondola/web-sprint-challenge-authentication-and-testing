const supertest = require('supertest');
const server = require('./api/server');
const db = require('./database/dbConfig');


describe('server.js.. / endpoint', () => {
    //CHECKING STATUS CODE!
    it('should return 200', () => {
        return supertest(server).get('/')
        .then(res => {
            expect(res.status).toBe(200)
        })
    });
})

describe('checking JSON language', () => {
    //CHECKING TYPE OF LANGUAGE
    it('should be using JSON', () => {
        return supertest(server).get('/')
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})

describe('Checking /endpoint contents', () => {
    // / endpoint test
    it('should respond with greeting/motivation', () => {
        return supertest(server).get('/')
        .then(res => {
            expect(res.body).toEqual({api: "is up, work hard every waking hour!"})
        })
    })
})

//////////////////////////TRUNCATION
//  beforeEach(async () => {
//      await db('users').truncate();
//  })


describe('/register POST', () => {

    it('register successful, returns 201', () => {
        return supertest(server)
            .post('/api/auth/register')
            .send({ username: 'test', password: 'test' })
            .then(res => {
                expect(res.status).toBe(201);
        })
    })
    it('register successful, returns 201', () => {
        return supertest(server)
            .post('/api/auth/register')
            .send({ username: 'testt', password: 'testt' })
            .then(res => {
                expect(res.status).toBe(201);
        })
    })

    it("register invalid, return 500", () => {
        return supertest(server)
            .post("/api/auth/register")
            .send({ username: 'false', password: 29})
            .then(res => {
            expect(res.status).toBe(500);
        });
    });

    // it("returns JSON", () => {
    //     return supertest(server)
    //     .post('/api/auth/register')
    //     .send({ username: 'test', password: 'test'})
    //     .then(response => {
    //         expect(response.type).toMatch(/json/i);
    //     })
    // } )
})

describe('/login POST', () => {


    it("returns JSON", () => {
        return supertest(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: 'test'})
        .then(response => {
            expect(response.type).toMatch(/json/i);
        })
    } )
    
    it('login valid, returns 200', () => {
        return supertest(server)
            .post('/api/auth/login')
            .send({ username: 'test', password: 'test'})
            .then(response => {
                expect(response.status).toBe(200)
            })
    })

    it('login invalid, returns 400', () => {
        return supertest(server)
        .post('/api/auth/login')
        .send({username: "wrongbro", password: "wrongbro"})
        .then(response => {
            expect(response.status).toBe(400)
        })
    })
})