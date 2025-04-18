class MyEventEmitter {
  constructor() {
    this._events = {};
  }
  on(eventName, handler) {
    if (this._events[eventName]) {
      this._events[eventName].push(handler);
    } else {
      this._events[eventName] = [handler];
    }
  }
  once(eventName, handler) {
    const onceWrapper = (...args) => {
      handler(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }
  off(eventName, handler) {
    if (this._events[eventName]) {
      this._events[eventName] = this._events[eventName].filter(
        (h) => h !== handler
      );
    }
  }
  emit(eventName, ...args) {
    if (this._events[eventName]) {
      this._events[eventName].forEach((event) => {
        event(...args);
      });
    }
  }
}

const emitter = new MyEventEmitter();

// emitter.on("dev", (name, fullname) => {
//   console.log("event 1 is fired", name, fullname);
// });

emitter.once("dev", () => {
  console.log("event 1 is fired");
});
emitter.once("krishna", (name, study) => {
  console.log(name, "is a", study);
});

emitter.emit("krishna", "krishna", "CA");
emitter.emit("krishna", "krishna", "CA");

// NOTE : differnce between rest and spread

// If ... is inside function parameters, it acts as Rest Operator (Groups values into an array).
// If ... is in function calls or array operations, it acts as Spread Operator (Expands an array into separate values).
