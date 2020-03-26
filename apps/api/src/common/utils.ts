export const removeMongoId = item => {
  item = item.toObject();
  delete item._id;
  delete item.__v;
  return item;
};

export const removeMongoIdFromArray = items => {
  return (
    items
      // resolve to object if mongoose obj
      .map(item =>
        typeof item.toObject === 'function' ? item.toObject() : item
      )
      // drops all attributes explicit specified, e.g. _id
      .map(({ _id, __v, ...keepAttrs }) => keepAttrs)
  );
};

export const createUuid = () => {
  // tslint:disable
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
    // tslint:enable
  });
};
