import 'dotenv/config';

export const config = {
  databaseUrl: process.env.DATABASE_URL || '',
};
