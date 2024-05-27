//CREATE USER
export async function post(URL,contentData) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contentData),
  });
  return response;
}

//OBTAIN user
export async function get(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

