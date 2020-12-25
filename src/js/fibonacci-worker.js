onmessage = (e) => {
  const n = BigInt(e.data);
  if(n == 1) {
    postMessage("<strong>1</strong>");
    return;
  }
  if(n == 2) {
    postMessage("1 <strong>1</strong>");
    return;
  }

  let result = "1 1";
  let a = b = BigInt(1);

  for(let i = 3; i < n; ++i) {
    let curr = a + b;
    result += ` ${curr}`;
    a = b;
    b = curr;
  }
  result += `<strong> ${a+b}</strong>`;

  postMessage(result);
}