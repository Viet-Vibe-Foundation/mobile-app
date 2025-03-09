import { prisma } from "../libs/db";

const getUserByEmailOrPhone = async (emailOrPhone: string) =>
  await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      password: true,
      emailVerified: true,
    },
    where: {
      OR: [
        {
          email: emailOrPhone,
        },
        { phone: emailOrPhone },
      ],
    },
  });
export { getUserByEmailOrPhone };
