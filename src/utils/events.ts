function on(eventType: any, listener: { (event: any): void; (this: Document, ev: any): any; }) {
  document.addEventListener(eventType, listener);
}

function trigger(eventType: string, data: any) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, trigger };
