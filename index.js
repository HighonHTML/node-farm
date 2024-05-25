const fs = require("fs");
const http = require("http");

// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

// async

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("file written");
//       });
//     });
//   });
// });

// creating a server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("welcome to the overview");
  } else if (pathName === "/product") {
    res.end("welcome to the product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "error-page",
    });
    res.end("page not found");
  }
});

server.listen("8000", "127.0.0.1", (err) => {
  console.log("server has started");
});
