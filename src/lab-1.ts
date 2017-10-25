import { Observable, Subject } from "rxjs";

const initialState: any = { items: [], loading: false };

const fetchSubject = new Subject();

const fetchReducer = fetchSubject.map(() => (state: any) => ({
  ...state,
  // tslint:disable-next-line:trailing-comma
  loading: true
}));

const resetSubject = new Subject();

const resetReducer = resetSubject.map(() => (state: any) => initialState);

const stateStream = Observable.merge(fetchReducer, resetReducer)
  .startWith(initialState)
  .scan((state: any, reducer: any) => reducer(state))
  .shareReplay(1);

stateStream
  .map((state: any) => JSON.stringify(state))
  .take(3)
  // tslint:disable-next-line:no-console
  .forEach((state: any) => console.log(state))
  // tslint:disable-next-line:no-console
  .then(() => console.log("done"))
  // tslint:disable-next-line:no-console
  .catch(() => console.log("error"));

fetchSubject.next();
resetSubject.next();
