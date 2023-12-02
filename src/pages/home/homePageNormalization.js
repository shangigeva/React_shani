const homePageNormalization = (dataFromServer, id) => {
  for (let user of dataFromServer) {
    user.isLiked = user.likes.includes(id);
  }
  return dataFromServer;
};
export default homePageNormalization;
