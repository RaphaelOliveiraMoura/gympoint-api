import request from 'supertest';

import app from '../../src/app';
import factory from '../factory';
import truncate from '../util/truncate';

describe('Student', () => {
  beforeEach(async () => {
    // Deleting all of the old the registers before run each test
    await truncate();
  });

  it('should succesfully create a student', async () => {
    // Generating the user data
    const user = await factory.attrs('User');

    // Creating the user
    await request(app)
      .post('/users')
      .send(user);

    const { email, password } = user;

    // Creating an session
    const { body: sessionBody } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const studentData = await factory.attrs('Student');

    // Creating the student passing the auth header
    const { body: student } = await request(app)
      .post('/students')
      .send(studentData)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    expect(student).toHaveProperty('id');
  });

  it('should succesfully update a student', async () => {
    // Generating the user data
    const user = await factory.attrs('User');

    // Creating the user
    await request(app)
      .post('/users')
      .send(user);

    const { email, password } = user;

    // Creating an session
    const { body: sessionBody } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const studentData = await factory.attrs('Student');

    // Creating the student passing the auth header
    const { body: student } = await request(app)
      .post('/students')
      .send(studentData)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    const { id } = student;
    // Updating the student data
    const { body: updatedStudent } = await request(app)
      .put(`/students/${id}`)
      .send({ ...studentData, name: 'New name' })
      .set('Authorization', `Bearer ${sessionBody.token}`);

    expect(updatedStudent.name).toBe('New name');
  });

  it("shouldn't create a student with an email that already exists", async () => {
    // Generating the user data
    const user = await factory.attrs('User');

    // Creating the user
    await request(app)
      .post('/users')
      .send(user);

    const { email, password } = user;

    // Creating an session
    const { body: sessionBody } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const studentData = await factory.attrs('Student');

    // Creating the first user
    await request(app)
      .post('/students')
      .send(studentData)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    // Creating the second student with a email that already exists
    const { status } = await request(app)
      .post('/students')
      .send({ studentData })
      .set('Authorization', `Bearer ${sessionBody.token}`);

    expect(status).toBe(400);
  });

  it("shouldn't update a student with an email that already exists", async () => {
    // Generating the user data
    const user = await factory.attrs('User');

    // Creating the user
    await request(app)
      .post('/users')
      .send(user);

    const { email, password } = user;

    // Creating an session
    const { body: sessionBody } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const studentData = await factory.attrs('Student');

    // Creating the first user
    const { body: firstStudent } = await request(app)
      .post('/students')
      .send(studentData)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    // Creating the second student
    const { body: willBeUpdated } = await request(app)
      .post('/students')
      .send({ ...studentData, email: 'test@gmail.com' })
      .set('Authorization', `Bearer ${sessionBody.token}`);

    const { id } = willBeUpdated;

    // Updating the second student data with an email that already exists
    const { status } = await request(app)
      .put(`/students/${id}`)
      .send({ ...willBeUpdated, email: firstStudent.email })
      .set('Authorization', `Bearer ${sessionBody.token}`);

    expect(status).toBe(400);
  });

  it('should pass the student id', async () => {
    // Generating the user data
    const user = await factory.attrs('User');

    // Creating the user
    await request(app)
      .post('/users')
      .send(user);

    const { email, password } = user;

    // Creating an session
    const { body: sessionBody } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const studentData = await factory.attrs('Student');

    // Not passing the student id to the route
    const { status: showStatus } = await request(app)
      .get(`/students/test`)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    // Not passing the student id to the route
    const { status: updateStatus } = await request(app)
      .put(`/students/test`)
      .send(studentData)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    const { status: deleteStatus } = await request(app)
      .delete(`/students/test`)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    expect(showStatus).toBe(400);
    expect(updateStatus).toBe(400);
    expect(deleteStatus).toBe(400);
  });
});