const apiKey = "U8XFRNN2aDlYiv62oL19KCXDyymg0hyf";

export default function getGifs({ keyword = "morty" } = {}) {
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=none&offset=0&rating=g&lang=en`;
  console.log("service");
  console.log({ keyword });
  return fetch(apiURL)
    .then((res) => res.json())
    .then((response) => {
      const { data = [] } = response;
      if (Array.isArray(data)) {
        const gifs = data.map((image) => {
          const { title, id } = image;
          const { url } = image.images.downsized_medium;
          return { title, id, url };
        });
        return gifs;
      }
    });
}
