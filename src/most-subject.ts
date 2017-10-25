import { propagateEventTask, runEffects, tap } from "@most/core";
import { currentTime, newDefaultScheduler } from "@most/scheduler";
import { create, event } from "most-subject";

// Create a new `Scheduler` for use in our application.
// Usually, you will want to only have one Scheduler, and it should be shared
// across your application
const scheduler = newDefaultScheduler();

// Create our sink and our stream.
// NOTE: stream is the resulting value of tap(console.log, stream).
const [sink, stream] = create(tap<number>(console.log));

// Pushes events into our stream.
const action = (n: number) => event(currentTime(scheduler), n, sink);

// Activate our stream.
runEffects(stream, scheduler);

// Simulate asynchronous data fetching,
// and then push values into our stream.

let i = 0;
const intervalHandle = setInterval(() => {
  action(i);
  i++;
  if (i >= 10) {
    clearInterval(intervalHandle);
  }
}, 500);
