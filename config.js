const env = process.env.NODE_ENV ? process.env.NODE_ENV : "production";

export default {
  development: {
    endpoint: "localhost:3000"
  },
  production: {
    endpoint: process.env.ENDPOINT
  }
}[env];
