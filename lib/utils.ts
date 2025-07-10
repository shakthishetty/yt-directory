import { clsx, type ClassValue } from "clsx";
import MarkdownIt from "markdown-it";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export function parseMarkdown(content: string) {
  return md.render(content);
}

export function parseServerActionResponse<T>(response:T){
  return JSON.parse(JSON.stringify((response)))
}