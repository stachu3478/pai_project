import { existsSync, readFileSync } from "fs";

const fileName = './.env.json'
const exists = existsSync(fileName)
if (exists) {
  // @ts-ignore bad multitype prediction
  const dataString = readFileSync(fileName).toString()
  console.log(dataString)
  const data = JSON.parse(dataString)
  Object.assign(process.env, data)
}