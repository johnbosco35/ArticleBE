import dotenv from "dotenv"

dotenv.config()

export const environmentVariable = {
    port: process.env.port!,
    database: process.env.database! as any,
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API,
    api_secret : process.env.CLOUD_SECRET,
    google_id: process.env.google_id,
    google_secret: process.env.google_secret,
    google_refreshtoken: process.env.google_refreshtoken,
    accessToken: process.env.accessToken,
  google_redirect: process.env.google_redirect,
}