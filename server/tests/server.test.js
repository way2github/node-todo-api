const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { SchoolModel } = require('./../models/school');

beforeEach((done) => {
    SchoolModel.remove({}).then(() => { done(); });
})

describe('Test POST /school', () => {
    it('should create a new student', (done) => {
        var name = 'Ayush';
        var age = 10;
        request(app)
            .post('/school')
            .send({ name, age })
            .expect(201)
            .expect((res) => { expect(res.body.name).toBe(name); })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                SchoolModel.find().then((school) => {
                    expect(school.length).toBe(1);
                    expect(school[0].name).toBe(name);
                    done();
                }).catch((e) => { done(e); })
            });
    });
});