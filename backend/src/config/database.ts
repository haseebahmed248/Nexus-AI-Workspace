export const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    logging: process.env.NODE_ENV === 'development'
  };
  