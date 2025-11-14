export default class AuthController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, reply) => {
    try {
      const user = await this.service.register(req.body);
      reply.code(201).send(user);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  };

  login = async (req, reply) => {
    try {
      const result = await this.service.login(req.body);
      reply.send(result);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  };
}
