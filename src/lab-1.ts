// tslint:disable:no-console
import { Observable, Subject } from "rxjs";

const initialState: any = { items: [], loading: false };

const resetReducer = () => (state: any) => initialState;

const fetchReducer = () => (state: any) => ({
  ...state,
  // tslint:disable-next-line:trailing-comma
  loading: true
});

const fetchSubject = new Subject();
const fetchReducerStream = fetchSubject.map(fetchReducer);

const resetSubject = new Subject();
const resetReducerStream = resetSubject.map(resetReducer);

const stateStream = Observable.merge(fetchReducerStream, resetReducerStream)
  .startWith(initialState)
  .scan((state: any, reducer: any) => reducer(state))
  .shareReplay(1);

stateStream
  .map((state: any) => JSON.stringify(state))
  .take(3)
  .forEach((state: any) => console.log(state))
  .then(() => console.log("done"))
  .catch(() => console.log("error"));

fetchSubject.next();
resetSubject.next();
