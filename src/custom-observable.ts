class Timer {
  private props: any;
  private intervalHandle: any;
  private state: { value: number };

  constructor(props: any) {
    this.props = props;
    this.state = { value: props.initialValue || 0 };
    this.intervalHandle = null;
  }

  public componentDidMount() {
    this.intervalHandle = setInterval(() => {
      this.setState((state: any) => ({ ...state, value: state.value + 1 }));
    }, 1000);
  }

  public componentDidUnmount() {
    clearInterval(this.intervalHandle);
  }

  public render() {
    this.props.onRender(this.state);
  }

  private setState(updater: any) {
    this.state = updater(this.state);
    this.render();
  }
}

const makeObservableTimer = (observer: any) => {
  const timer = new Timer({
    initialValue: 8995,
    onRender: (state: any) =>
      state.value > 9000
        ? observer.error("It's above nine-thousand!")
        : observer.next(state),
    // tslint:disable-next-line:trailing-comma
    onComponentDidUnmount: () => observer.complete()
  });

  timer.componentDidMount();
  // tslint:disable-next-line:no-console
  return () => {
    timer.componentDidUnmount();
  };
};

/**
 * now let's use it
 */
const unsub = makeObservableTimer({
  next(x: any) {
    // tslint:disable-next-line:no-console
    console.log(x);
  },
  error(err: any) {
    // tslint:disable-next-line:no-console
    console.error(err);
  },
  complete() {
    // tslint:disable-next-line:no-console
    console.log("done");
    // tslint:disable-next-line:trailing-comma
  }
});

/**
 * uncomment to try out unsubscription
 */
// setTimeout(unsub, 500);
