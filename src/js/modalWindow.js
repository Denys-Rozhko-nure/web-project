const h3 = document.getElementById("show-modal");
const p = document.getElementById("fibonacci-result");
const modal = document.getElementById("select-fibonacci");
const input = document.getElementById("fibonacci-number");
const button = document.getElementById("lauch-computing");

let isComputing = false;

h3.onclick = () => {
  if(isComputing) return;
  isComputing = true;

  const h3Rect = h3.getBoundingClientRect();
  
  modal.style.display = "flex";
  modal.style.top = window.pageYOffset + h3Rect.top - modal.clientHeight + "px";
  modal.style.left = Math.max(0, window.pageXOffset + h3Rect.left - 300) + "px";

  const listener = () => {
    const worker = new Worker("fibonacci-worker.js");
    worker.postMessage(input.value);

    p.innerHTML = "Computing..."

    worker.onmessage = (e) => {
      p.innerHTML = e.data;
      isComputing = false;
      worker.terminate();
    }

    modal.style.display = "none";
    button.removeEventListener("click", listener);
  }

  button.addEventListener("click", listener);
}