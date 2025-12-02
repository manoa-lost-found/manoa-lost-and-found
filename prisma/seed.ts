import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database…');

  const passwordHash = await hash('changeme', 10);

  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;

    console.log(`  Creating user from config: ${account.email} (${role})`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password: passwordHash,
        role,
        emailVerified: new Date(),
      },
    });
  }

  console.log('  Creating Playwright test users…');

  await prisma.user.upsert({
    where: { email: 'john@hawaii.edu' },
    update: {},
    create: {
      email: 'john@hawaii.edu',
      password: passwordHash,
      role: Role.USER,
      emailVerified: new Date(),
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@hawaii.edu' },
    update: {},
    create: {
      email: 'admin@hawaii.edu',
      password: passwordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });

  for (const data of config.defaultData) {
    const condition = (data.condition as Condition) || Condition.good;
    const index = config.defaultData.indexOf(data) + 1;

    console.log(`  Adding Stuff item: ${data.name}`);

    await prisma.stuff.upsert({
      where: { id: index },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  console.log('Seed complete ✔');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
