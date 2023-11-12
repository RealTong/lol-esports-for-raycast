export function getIcon(teamImage: string) {
  return `https://am-a.akamaihd.net/image?resize=70:&f=${teamImage}`;
}

export function prettyDate(date: string) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const monthDayYear = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
  if (isSameDay(today, date)) {
    return `${time}, today`;
  }
  if (isSameDay(yesterday, date)) {
    return `${time}, yesterday`;
  }
  if (isSameDay(tomorrow, date)) {
    return `${time}, tomorrow`;
  }
  if (isSameWeek(today, date)) {
    return `${time}, ${dayOfWeek}`;
  }
  if (isSameYear(today, date)) {
    return `${time}, ${monthDay}`;
  }
  return `${time}, ${monthDayYear}`;
}

function isSameDay(today: Date, date: string) {
  return (
    new Date(date).getDate() === today.getDate() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getFullYear() === today.getFullYear()
  );
}

function isSameWeek(today: Date, date: string) {
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  return new Date(date) >= firstDayOfWeek && new Date(date) <= lastDayOfWeek;
}

function isSameYear(today: Date, date: string) {
  return new Date(date).getFullYear() === today.getFullYear();
}
