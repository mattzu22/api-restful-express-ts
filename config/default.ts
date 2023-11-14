const dbUser =  process.env.DB_USER
const dbPassword =  process.env.DB_PASS

export default {
    port: 3333,
    dbUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster1.xjtxyjv.mongodb.net/?retryWrites=true&w=majority`,
    env: "development"
}