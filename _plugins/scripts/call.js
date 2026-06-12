let input = "";

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", async () => {
  const data = JSON.parse(input);
  const mod = await import("./" + data.name + ".js");
  const result = await mod.default(data.param);
  console.log(data.uuid);
  console.log(JSON.stringify(result));
});
