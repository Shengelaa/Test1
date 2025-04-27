function debouncer(cb, ms) {
  let interval;
  return (...args) => {
    clearInterval(interval);
    interval = setTimeout(() => {
      cb(...args);
    }, ms);
  };
}
const input2 = document.querySelector("#searchBar");
const container = document.querySelector(".container");
input2.addEventListener(
  "input",
  debouncer(async (e) => {
    container.innerHTML = "Loading...";
    const resp = await fetch(`https://www.instagram.com/${e.target.value}/`);

    const data = await resp.json();
    console.log(data);

    container.innerHTML = data
      .map(
        (el) =>
          `
        <h4>${el.title + "  " + "$" + el.price}</h4>
        <p>${el.description}</p>`
      )
      .join("");
  }, 1000)
);
