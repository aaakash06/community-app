import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import queryString from 'query-string';
// checking sync with git

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (days < 365) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else {
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }
}

export function formatNumber(num: number): string {
  const absNum = Math.abs(num);

  if (absNum >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (absNum >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
}

export function changeQuery(searchParams: string,key:string,value: string){

const newQuery = queryString.parse(searchParams); 
newQuery[key] = value; 
const newUrl = queryString.stringifyUrl({url: window.location.pathname, query: newQuery },{skipNull: true})
return newUrl;

  }
export function removeQuery(searchParams: string, keys: string[]){

const currQuery = queryString.parse(searchParams); 
keys.forEach(key => {
  delete currQuery[key]; 
})
const newUrl = queryString.stringifyUrl({url: window.location.pathname, query: currQuery },{skipNull: true})
return newUrl;

  }