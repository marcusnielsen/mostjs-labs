import { propagateEventTask, runEffects, tap } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import { create, event } from "most-subject";

// Create a new `Scheduler` for use in our application.
// Usually, you will want to only have one Scheduler, and it should be shared
// across your application
const scheduler = newDefaultScheduler();

// Create our sink and our stream.
// NOTE: stream is the resulting value of tap(console.log, stream).
const [sink, stream] = create(tap<number>(console.log));

// Pushes events into our stream.
const next = (n: number) => sink.event(Number.MAX_SAFE_INTEGER, n);

// Activate our stream.
runEffects(stream, scheduler);

// Simulate asynchronous data fetching,
// and then push values into our stream.
Promise.resolve([1, 2, 3]).then(data => data.forEach(next));

let i = 0;
const intervalHandle = setInterval(() => {
  next(i + 10);
  i++;
  if (i >= 10) {
    clearInterval(intervalHandle);
  }
}, 500);
