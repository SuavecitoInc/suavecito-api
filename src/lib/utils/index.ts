export function format(uptime: number) {
  function pad(s: number) {
    return (s < 10 ? "0" : "") + s;
  }
  const hours = Math.floor(uptime / (60 * 60));
  const minutes = Math.floor((uptime % (60 * 60)) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
