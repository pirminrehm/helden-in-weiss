export const removeMongoId = item => {
  item = item.toObject();
  delete item._id;
  delete item.__v;
  return item;
};

export const removeMongoIdFromArray = items => {
  // drops all attributes explicit specified, e.g. _id
  return items
    .map(item => item.toObject())
    .map(({ _id, __v, ...keepAttrs }) => keepAttrs);
};
