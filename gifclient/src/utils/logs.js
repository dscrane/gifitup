const io = (log, data = " ") =>
  console.info(log, "color: orange", "color: white", "color: yellow", data);

const player = (log, data) => console.info(log, "color: cyan", data);

const emit = (log) => console.group("%c[IO_em]: ", "color: coral", log);

const ack = (log) => {
  console.info(`%c[IO_ack]: %c${log}`, "color: lightsalmon", "color: white");
  console.groupEnd();
};

const gif = (log, data) =>
  console.info(log, "color: lightslategrey", "color: white", data);

export const log = {
  io,
  player,
  emit,
  ack,
  gif,
};
