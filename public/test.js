console.log("sayHello");
export function sayHello() {
  addEventListener("message", (e) => {
    console.log(e);
    /* if (e.data === "hello") {
      postMessage("world");
    } */
  });
}
