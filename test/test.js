// set NODE_ENV to 'test' to load test database uri from config files
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Team = require('../app/models/team');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

// test all accepted API requests as well as database connection
describe('/api', function () {
  
  // clear Team collection from test database before each test to ensure test accuracy
  beforeEach(function () {
    return Team.remove({});
  });
  
  // clear Team collection from test database after running all tests
  after(function () {
    return Team.remove({});
  });
  
  // get request to /api/teams should return an array of JSON objects represeting all teams in the collection
  describe('/GET teams', function () {
    it('should GET all the teams', function (done) {
      chai.request(server)
        .get('/api/teams')
        .end(function (err, res) {
          res.should.have.status(200),
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  
  // post request to /api/teams should not post a team without all required fields being submitted
  describe('/POST team', function (done) {
    it('should not POST a team without league field', function (done) {
      const team = {
        name: 'Yankees',
        city: 'New York'
      };
      chai.request(server)
        .post('/api/teams')
        .send(team)
        .end(function (err, res) {
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('league');
          res.body.errors.league.properties.should.have.property('type').eql('required');
          done();
        });
    });
    
    // post request to /api/teams should post a team when all required fields are submitted
    it('should POST a team', function (done) {
      const team = {
        name: 'Yankees',
        city: 'New York',
        league: 'MLB'
      };
      chai.request(server)
        .post('/api/teams')
        .send(team)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Team created!');
          res.body.team.should.have.property('name');
          res.body.team.should.have.property('city');
          res.body.team.should.have.property('league');
          done();
        });
    });
  });
  
  // get request to /api/teams/:team_id should return a JSON object representing the team with the given id
  describe('GET/:id team', function () {
    it('should get a team by the given id', function (done) {
      const newTeam = new Team({
        name: 'Yankees',
        city: 'New York',
        league: 'MLB'
      });
      newTeam.save(function (err, team) {
        chai.request(server)
          .get('/api/teams/' + team.id)
          .send(team)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('city');
            res.body.should.have.property('league');
            res.body.should.have.property('_id').eql(team.id);
            done();
          });
      });
    });
  });
  
  // put request to /api/teams/:team_id should update the document with the given id and return a message + the updated object
  describe('PUT/:id team', function () {
    it('should update a team given the id', function (done) {
      const newTeam = new Team({
        name: 'Braves',
        city: 'Georgia',
        league: 'MLB'
      });
      newTeam.save(function (err, team) {
        chai.request(server)
          .put('/api/teams/' + team.id)
          .send({ name: 'Braves', city: 'Atlanta', league: 'MLB' })
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Team updated!');
            res.body.team.should.have.property('city').eql('Atlanta');
            done();
          });
      });
    });
  });
  
  // delete request to /api/teams/:team_id should delete the team with the given id and return a message
  describe('DELETE/:id team', function () {
    it('should delete a team given the id', function (done) {
      const newTeam = new Team({
        name: 'Braves',
        city: 'Atlanta',
        league: 'MLB'
      });
      newTeam.save(function (err, team) {
        chai.request(server)
          .delete('/api/teams/' + team.id)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Successfully deleted');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });
});
  


  