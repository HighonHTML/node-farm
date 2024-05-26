const fs = require("fs");
const http = require("http");
const url = require('node:url');

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
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

function replaceTemplate(temp, product) {

  // use a regualr expression to replace every instance and not just the first one
  let object = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  object = object.replace(/{%ID%}/g, product.id);
  object = object.replace(/{%IMAGE%}/g, product.image);
  object = object.replace(/{%FROM%}/g, product.from);
  object = object.replace(/{%NUTRIENTS%}/g, product.nutrients);
  object = object.replace(/{%QUANTITY%}/g, product.quantity);
  object = object.replace(/{%PRICE%}/g, product.price);
  if (!product.organic) {
    object = object.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  object = object.replace(/{%DESCRIPTION%}/g, product.description);
  return object;
}

const server = http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url, true)
 
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObject[query.id]
    const output = replaceTemplate(tempProduct, product)
    console.log(output)
    res.end(output);
  } else if (pathname === "/api") {
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
