import { hashPassword, comparePassword } from "../../utils/hash.js";

export default class AuthService {
  constructor(prisma, jwt) {
    this.prisma = prisma;
    this.jwt = jwt;
  }

  async register(data) {
    const hashed = await hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
      },
    });
  }

  async login(data) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new Error("Email not found");

    const match = await comparePassword(data.password, user.password);
    if (!match) throw new Error("Wrong password");

    const token = this.jwt.sign({ id: user.id, email: user.email });

    return { token, user };
  }
}
