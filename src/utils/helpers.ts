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
    
    try {
        return Number(price)
            .toLocaleString("en-US", {
                style: "currency",
                currency: currecny
            });
    } catch(e) {
        console.log("e, currecny: ", e, currecny);
    }

    return Number(price)
            .toLocaleString("en-US", {
                style: "currency",
                currency: "INR"
            });
};

export const downloadBlobFile = (file: Blob, filename: string): void => {
    const navigator = window.navigator as any;
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(file, filename);
    } else {
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}