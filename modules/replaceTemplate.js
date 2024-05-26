module.exports = (temp, product) => {
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
};
