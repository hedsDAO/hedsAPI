import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'production';

const schemaName = (() => {
  switch (env) {
    case 'development':
      return process.env.DEV_SCHEMA_NAME;
    case 'test':
      return process.env.PROD_SCHEMA_NAME;
    default:
      return process.env.PROD_SCHEMA_NAME;
  }
})();

export default schemaName;
