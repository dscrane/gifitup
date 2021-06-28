import chalk from "chalk";

const red = ( log) => {
  console.log(`\x1b[31m${log}\x1b[0m`);
};

const green = (log) => {
  console.log(`\x1b[32m${log}\x1b[0m`);
};

const yellow = (log) => {
  console.log(`\x1b[33m${log}\x1b[0m`);
};

const blue = (log) => {
  console.log(`\x1b[34m${log}\x1b[0m`);
};

const cyan = (log) => {
  console.log(`\x1b[36m${log}\x1b[0m`);
};

const socket = (data="", log, data2="") => console.log(`${chalk.yellow('[SOCKET]: ')} ${chalk.green(data)} ${log} ${chalk.cyan(data2)}`)
const room = (roomId, log, data="") => console.log(`[${chalk.cyan(roomId)}]: ${log}`, data)
const app = (log) => console.log(`${chalk.gray('[APP]:')} ${log}`)
export const log = {
  red,
  green,
  yellow,
  blue,
  cyan,
  socket,
  app,
  room
};
