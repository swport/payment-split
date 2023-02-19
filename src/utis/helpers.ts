let lastId = 0;

export const randomId = () => {
    return Math.floor(Math.random() * 1000) + ++lastId;
};

export const getInitialsFromName = (str: string) => {
    return str
        .split(" ")
        .slice(0, 2)
        .map((s) => s[0])
        .join("")
        .toUpperCase();
};

export const getRandomColor = () => {
  let color = ((Math.random() * 0xffffff) << 0).toString(16);

  while (color.length < 6) {
      color = ((Math.random() * 0xffffff) << 0).toString(16);
  }

  const red = parseInt(color.substring(0, 2), 16);
  const green = parseInt(color.substring(2, 4), 16);
  const blue = parseInt(color.substring(4, 6), 16);
  const brightness = red * 0.299 + green * 0.587 + blue * 0.114;

  if (brightness > 180) {
      return {
          backgroundColor: "#" + color,
          color: "#000000"
      };
  }

  return {
      backgroundColor: "#" + color,
      color: "#ffffff"
  };
};

export const numToPrice = (price: string | number, currecny: string) => {
    
    return Number(price)
        .toLocaleString("en-US", {
            style: "currency",
            currency: currecny
        });
};