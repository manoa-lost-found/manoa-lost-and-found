import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database…');

  const passwordHash = await hash('changeme', 10);

  // Seed accounts from config (deterministic: updates password/role/emailVerified too)
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;

    console.log(`  Upserting user from config: ${account.email} (${role})`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        password: passwordHash,
        role,
        emailVerified: new Date(),
      },
      create: {
        email: account.email,
        password: passwordHash,
        role,
        emailVerified: new Date(),
      },
    });
  }

  console.log('  Creating Playwright test users…');

  // Playwright USER
  await prisma.user.upsert({
    where: { email: 'john@hawaii.edu' },
    update: {
      password: passwordHash,
      role: Role.USER,
      emailVerified: new Date(),
    },
    create: {
      email: 'john@hawaii.edu',
      password: passwordHash,
      role: Role.USER,
      emailVerified: new Date(),
    },
  });

  // Playwright ADMIN
  await prisma.user.upsert({
    where: { email: 'admin@hawaii.edu' },
    update: {
      password: passwordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
    create: {
      email: 'admin@hawaii.edu',
      password: passwordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });

  // Seed default Stuff data (clean index usage)
  for (let i = 0; i < config.defaultData.length; i += 1) {
    const data = config.defaultData[i];
    const condition = (data.condition as Condition) || Condition.good;
    const id = i + 1;

    console.log(`  Upserting Stuff item: ${data.name}`);

    await prisma.stuff.upsert({
      where: { id },
      update: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
      create: {
        id, // optional, but makes it deterministic
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
