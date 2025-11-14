export default class UserController {
  constructor(service) {
    this.service = service;
  }

  profile = async (req, reply) => {
    const user = await this.service.getProfile(req.user.id);
    reply.send(user);
  };
}
