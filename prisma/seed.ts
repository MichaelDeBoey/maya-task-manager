import { faker } from "@faker-js/faker";
import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await Promise.all(
    Object.keys(Status).map((status) =>
      Array.from({
        length: faker.number.int({ min: 3, max: 10 }),
      }).map((_, i) => {
        const title = faker.lorem.words(faker.number.int({ min: 1, max: 3 }));

        return prisma.task
          .create({
            data: {
              order: i + 1,
              status: status as Status,
              title,
            },
          })
          .then(() => {
            console.log(`Created task: ${title}`);
          });
      }),
    ),
  );

  console.log(`Database has been seeded. 🌱`);
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
