import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.userPreference.deleteMany();
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "Alice",
  //       email: "Alice1@test.com",
  //       age: 21,
  //     },
  //     {
  //       name: "Alice",
  //       email: "Alice2@test.com",
  //       age: 22,
  //     },
  //     {
  //       name: "Alice",
  //       email: "Alice3@test.com",
  //       age: 23,
  //     },
  //   ],
  // });

  // const user = await prisma.user.create({
  //   data: {
  //     name: "Jerm",
  //     email: "Jerm@test.com",
  //     age: 33,
  //     userPreference: {
  //       create: {
  //         emailUpdates: true,
  //       },
  //     },
  //   },
  //   select: {
  //     name: true,
  //     userPreference: { select: { id: true } },
  //   },
  // });
  // const user = await prisma.user.findMany({
  //   where: {
  // name: "Alice",
  // age: { gt: 22 },
  // email: { startsWith: "alice" },
  // AND: [{ email: { startsWith: "Alice" } }, { name: "Alice" }],
  // NOT: [{ email: { startsWith: "Alice" } }],
  // userPreference: {
  //   emailUpdates: true,
  // },
  // writtenPosts: {
  //   some: {
  //     title: { startsWith: "Test" },
  //   },
  // },

  //   },
  // });

  // const user = await prisma.user.update({
  //   // where: {
  //   //   email: "Alice1@test.com",
  //   // },
  //   // data: {
  //   //   email: "Alice4@test.com",
  //   // },
  //   where: {
  //     email: "Alice4@test.com",
  //   },
  //   data: {
  //     userPreference: {
  //       create: {
  //         emailUpdates: true,
  //       }
  //     },
  // });

  // const preference = await prisma.userPreference.create({
  //   data: {
  //     emailUpdates: true,
  //   },
  // });

  // const user = await prisma.user.update({
  //   where: {
  //     email: "Alice2@test.com",
  //   },
  //   data: {
  //     userPreference: {
  //       connect: {
  //         id: "9389b13f-f7e4-4fa3-b7d5-d1a2e00204f1",
  //       },
  //     },
  //   },
  // });

  // const users = await prisma.user.findMany({});
  // const preferences = await prisma.userPreference.findMany({});
  // console.log(users);
  // console.log(preferences);

  const user = await prisma.user.deleteMany({
    where: {
      age: { gt: 20 },
    },
  });
  // console.log(preference);
  // console.log(user);
}

main()
  .catch((error) => {
    console.log(error.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
