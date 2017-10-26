import { propagateEventTask, runEffects, tap } from '@most/core'
import { currentTime, newDefaultScheduler } from '@most/scheduler'
import { ap, compose, fromJust, isJust, Maybe, toMaybe } from '@typed/prelude'
import { create, event } from 'most-subject'

const initialState = {
  value: '',
}

// tslint:disable-next-line:no-console
const log = (maybe: any) => ap(toMaybe(console.log), maybe)

const scheduler = newDefaultScheduler()

const [sink, stream] = create()

const setValue = (value: Maybe<string>) =>
  event(currentTime(scheduler), value, sink)

runEffects(tap(log, stream), scheduler)

setValue(toMaybe('h'))
setValue(toMaybe('he'))
setValue(toMaybe(null))
setValue(toMaybe('hej'))
