async function fetchData(url, method, options=null) {
  try {
    const res = await fetch(url, { method })
    return await res.json()
  } catch (err) {
    return err
  }
}
export default fetchData
