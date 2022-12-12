process.stdin.on('data', (data) => {
  const answer = data.toString().split('').reverse().join('');
  process.stdout.write(`${answer}\n`);
});
