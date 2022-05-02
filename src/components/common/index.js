export const mobileToCom = (url) => {
  const data = url
    .replace("https://m.", "https://")
    .replace("http://m.", "http://")
    .replace("https://mm.", "http://");
  return data;
};
