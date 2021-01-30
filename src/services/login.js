const ENDPOINT = "http://localhost:8080";

export default function LoginService({ username, password }) {
  return fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Response is not ok");
      return res.json();
    })
    .then((res) => {
      const { jwt } = res;
      return jwt;
    });
}
