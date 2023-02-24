export {};

declare global {
  interface Window {
    count: number;
    tasks: any;
  }
}

let process = window.tasks;
let count = window.count;