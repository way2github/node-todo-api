const request = require('supertest');
//const { assert } = require('chai');
const { expect } = require('chai');

const { app } = require('./../server');
const { Student } = require('./../models/student');

const students = [{ name: 'Atin', age: 5.5 }, { name: 'Arnesh', age: 5 }];

beforeEach((done) => {
    Student.remove({}).then(() => {
        return Student.insertMany(students);
    }).then(() => done());
});

describe('Test GET /student', () => {
    it('should get all students', (done) => {
        request(app)
            .get('/student')
            .send()
            .expect(200)
            .expect((res) => {
                //console.log(res.body);
                expect(res.body.student.length).to.equal(2);
                expect(res.body.student[0].name).to.equal(students[0].name);
                expect(res.body.student[1].name).to.equal(students[1].name);
            })
            .end((err, res) => {
                if (err) throw err;
                Student
                    .find()
                    .then((student) => {
                        expect(student.length).to.equal(2);
                        expect(student[0].name).to.equal(students[0].name);
                        expect(student[1].name).to.equal(students[1].name);
                        done();
                    })
                    .catch((e) => { done(e); })
            });
    });
});
describe('Test POST /student', () => {
    it('should create a new student', (done) => {
        var name = 'Ronav';
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
                        expect(student.length).to.equal(3);
                        expect(student[2].name).to.equal(name);
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
                    expect(student.length).to.equal(2);
                    done();
                })
                    .catch((e) => { done(e); });
            });
    });
});