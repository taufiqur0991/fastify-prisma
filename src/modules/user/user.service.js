export default class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getProfile(id) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
