import Joi from 'joi';
import Student from '../models/Student';

class StudentControler {
  async store(req, res) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      age: Joi.number()
        .integer()
        .required(),
      weight: Joi.number().required(),
      height: Joi.number().required(),
    });

    // Validating the input data
    Joi.validate(req.body, schema, err => {
      if (err) {
        return res.status(400).json({ err: err.details });
      }
    });

    const { email } = req.body;

    // Verifying if there's another student register with the same email
    const studentExists = await Student.findOne({ where: { email } });
    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'A student with that email already exists' });
    }

    const { id, name, height, weight } = await Student.create(req.body);

    return res.json({ id, name, email, height, weight });
  }

  async update(req, res) {
    // For updating a student, it needs to provide his/her id as a route param

    const schema = Joi.object().keys({
      name: Joi.string(),
      email: Joi.string().email(),
      age: Joi.number().integer(),
      weight: Joi.number(),
      height: Joi.number(),
    });

    // Validating the input data
    Joi.validate(req.body, schema, err => {
      if (err) {
        return res.status(400).json({ err: err.details });
      }
    });

    const { email } = req.body;

    // Finding the student register
    const student = await Student.findByPk(req.params.student_id);

    if (email && email !== student.email) {
      // Verifying if there isn't a student already using this same email.
      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'A student with that email already exists' });
      }
    }

    const { id, name, height, weight } = await student.update(req.body);

    return res.json({ id, name, email, height, weight });
  }
}

export default new StudentControler();
