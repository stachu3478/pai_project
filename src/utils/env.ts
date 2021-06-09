import { existsSync, readFileSync } from "fs";

const fileName = './.env.json'
const exists = existsSync(fileName)
if (exists) {
  const dataString = readFileSync(fileName).toString()
  const data = JSON.parse(dataString)
  Object.assign(process.env, data)
}