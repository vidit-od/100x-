// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      MongooseUrl: string;
      JwtSecret:string;
      // Add other environment variables here
    }
  }
  