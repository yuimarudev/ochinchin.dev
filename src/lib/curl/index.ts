export const colors = ["red", "yellow", "green", "blue", "magenta", "cyan", "white"];

export const color = (previousColor: number) => {
  let color;

  do {
    color = Math.floor(Math.random() * colors.length);
  } while (color === previousColor);

  return color;
};
