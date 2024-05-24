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

export async function get(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function remove(URL, id) {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function put(URL, element) {
  await fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(element),
  });
}
