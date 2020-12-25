onmessage = (e) => {
  const n = BigInt(e.data);
  if(n == 1) return "<b>1</b>";
  if(n == 2) return "1 <b>1</b>"
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