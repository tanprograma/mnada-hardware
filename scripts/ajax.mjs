export async function getItems(url) {
  const rawResult = await fetch(url);
  const result = await rawResult.json();
  // console.log(result);
  return result;
}
