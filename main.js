const http = require("http");
const url = require("url");
const fs = require("fs/promises");
const querystring = require("querystring");
const { readFileAndParse, writeFileAndStringify } = require("./utilis");
// 1) Create a server and handle this route /delete-file?filepath=test.txt,  and delete this file, if this file does not exists handle some error message.

// const server = http.createServer(async (req, res) => {
//   const parsedUrl = url.parse(req.url);
//   if (parsedUrl.pathname === "/delete-file") {
//     const query = querystring.parse(parsedUrl.query);
//     if (query.filepath) {
//       await fs.unlink(query.filepath);
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end(" File deleted successfully");
//     } else {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("File not found");
//     }
//   }
// });
// server.listen(4000, () => {
//   console.log("server running on http://localhost:4000");
// });

// 2) Create a server that handles products CRUD. create products.json and paste some products data. user should add/update/delete/get products. There should be pagination and also add filters like /posts?priceFrom=100&priceTo=300 should return all products within price range of 100-300.
// const server = http.createServer(async (req, res) => {
//   const parsedUrl = url.parse(req.url);
//   if (parsedUrl.pathname === "/products" && req.method === "GET") {
//     const query = querystring.parse(parsedUrl.query);
//     console.log(query, "query");

//     let page = Number(query.page || 1);
//     let take = Number(query.take || 4);
//     take = Math.min(4, take);
//     const start = (query.page - 1) * take;
//     const end = page * take;
//     const products = await readFileAndParse("products.json", true);

//     let filteredProducts = products;

//     if (query.priceTo) {
//       let from = Number(query.priceFrom || 100);
//       let priceTo = Number(query.priceTo || 300);
//       filteredProducts = products.filter(
//         (el) => el.price > from && el.price < priceTo
//       );
//     }
//     const obj = {
//       page,
//       take,
//       data: filteredProducts.slice(start, end),
//       total: filteredProducts.length,
//     };
//     res.writeHead(200, {
//       "content-type": "application/json",
//     });
//     res.end(JSON.stringify(obj));
//   }
//   if (parsedUrl.pathname.startsWith("/products") && req.method === "PUT") {
//     const id = parsedUrl.pathname.split("/")[2];
//     const products = await readFileAndParse("products.json", true);
//     const index = products.findIndex((el) => el.id === Number(id));
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", async () => {
//       const parsedData = JSON.parse(body);

//       if (index === -1) {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         return res.end("Product not found");
//       }
//       const updateProduct = {};
//       if (parsedData.title) {
//         updateProduct.title = parsedData.title;
//       }
//       if (parsedData.price) {
//         updateProduct.price = parsedData.price;
//       }

//       products[index] = {
//         ...products[index],
//         ...updateProduct,
//       };

//       await writeFileAndStringify("products.json", products, true);

//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Product updated successfully");
//     });
//   }

//   if (parsedUrl.pathname.startsWith("/products") && req.method === "DELETE") {
//     const id = parsedUrl.pathname.split("/")[2];
//     const products = await readFileAndParse("products.json", true);
//     const index = products.findIndex((el) => el.id === Number(id));
//     console.log(index, id);

//     if (index === -1) {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Product not found");
//     }
//     const deletedProducts = products.splice(index, 1);
//     await writeFileAndStringify("products.json", products, true);
//     res.end(" Product deleted successfully");
//   }
//   if (parsedUrl.pathname === "/products" && req.method === "POST") {
//     let body = "";
//     let parsedData;

//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       parsedData = JSON.parse(body);
//     });
//     const products = await readFileAndParse("products.json", true);
//     const lastId = products[products.length - 1]?.id || 0;
//     const newProduct = {
//       id: lastId + 1,
//       title: parsedData.title,
//       price: parsedData.price,
//     };
//     products.push(newProduct);
//     await writeFileAndStringify("products.json", products, true);
//     res.writeHead(201, {
//       "content-type": "text/plain",
//     });
//     res.end("Products created successfully");
//   }
// });
// server.listen(4000, () => {
//   console.log("server running on http://localhost:4000");
// });
// 3) Create a server and handle this route /time?city=London, it should return what time is that city. Try to support few countries like NY, Berlin, Madrid, Pekin, Kiev and etc.
