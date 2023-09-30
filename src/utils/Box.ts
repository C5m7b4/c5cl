const Box = (x: any) => ({
  map: (f: Function) => Box(f(x)),
  inspect: `Box${x}`,
  fold: (f: any) => f(x),
});

export default Box;
