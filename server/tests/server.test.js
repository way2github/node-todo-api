const request = require('supertest');
//const { assert } = require('chai');
const { expect } = require('chai');

const { app } = require('./../server');
const { Student } = require('./../models/student');


beforeEach((done) => {
    Student.remove({}).then(() => { done(); });
});

describe('Test POST /student', () => {
    it('should create a new student', (done) => {
        var name = 'Ayush';
        var age = 10;
        request(app)
            .post('/student')
            .send({ name, age }, { name, age })
            .expect(201)
            .expect((res) => { expect(res.body.name).to.equal(name); })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Student
                    .find()
                    .then((student) => {
                        expect(student.length).to.equal(1);
                        expect(student[0].name).to.equal(name);
                        done();
                    })
                    .catch((e) => { done(e); })
            });
    });
    it('should not create a new student with empty data', (done) => {
        request(app)
            .post('/student')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Student.find().then((student) => {
                    expect(student.length).to.equal(0);
                    done();
                })
                    .catch((e) => { done(e); });
            });
    });
});