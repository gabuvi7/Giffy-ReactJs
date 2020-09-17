import { API_URL, API_KEY } from "./settings";

const fromApiResponseToGifs = (apiResponse) => {
  const { data = [] } = apiResponse;
  if (Array.isArray(data)) {
    const gifs = data.map((image) => {
      const { title, id } = image;
      const { url } = image.images.downsized_medium;
      return { title, id, url };
    });
    return gifs;
  }
  return [];
};

export default function getGifs({
  limit = "5",
  keyword = "morty",
  rating,
  lang,
  page = 0,
} = {}) {
  const apiURL = `${API_URL}/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${
    page * limit
  }&rating=${rating}&lang=${lang}`;

  return fetch(apiURL)
    .then((res) => res.json())
    .then(fromApiResponseToGifs);
}
