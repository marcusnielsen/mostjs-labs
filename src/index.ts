import {
  filter,
  map,
  propagateEventTask,
  runEffects,
  scan,
  tap,
} from '@most/core'
import { currentTime, newDefaultScheduler } from '@most/scheduler'
import { pipe } from '@typed/functions'
import { ap, fromJust, isJust, Maybe, toMaybe } from '@typed/maybe'
import { create, event } from 'most-subject'

const initialState: any = {
  value: '',
}

// tslint:disable-next-line:no-console
const log = console.log

const scheduler = newDefaultScheduler()

const [sink, setValueStream] = create()

const setValue = (value: Maybe<string>) =>
  event(currentTime(scheduler), value, sink)

const resultStream = pipe(
  filter(isJust),
  map(fromJust),
  // @TODO: figure out why the initialState is output last
  scan((acc, value) => ({ ...acc, value }), initialState),
  tap(log)
)(setValueStream)

runEffects(resultStream, scheduler)

setValue(toMaybe('h'))
setValue(toMaybe(null))
setValue(toMaybe('he'))
setValue(toMaybe(null))
setValue(toMaybe('hej'))
