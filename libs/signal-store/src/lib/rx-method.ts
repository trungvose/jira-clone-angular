import {
  assertInInjectionContext,
  DestroyRef,
  effect,
  inject,
  Injector,
  isSignal,
  Signal,
  untracked,
} from '@angular/core';
import { isObservable, Observable, of, Subject, Unsubscribable } from 'rxjs';

export type RxMethodOptions = { injector?: Injector };

type RxMethodInput<Input> = Input | Observable<Input> | Signal<Input>;

type RxMethod<Input> = ((input: RxMethodInput<Input>) => Unsubscribable) &
  Unsubscribable;

export function rxMethod<Input>(
  generator: (source$: Observable<Input>) => Observable<unknown>,
  options?: RxMethodOptions
): RxMethod<Input> {
  if (!options?.injector) {
    assertInInjectionContext(rxMethod);
  }

  const injector = options?.injector ?? inject(Injector);
  const destroyRef = injector.get(DestroyRef);
  const source$ = new Subject<Input>();

  const sourceSub = generator(source$).subscribe();
  destroyRef.onDestroy(() => sourceSub.unsubscribe());

  const rxMethodFn = (input: RxMethodInput<Input>) => {
    let input$: Observable<Input>;

    if (isSignal(input)) {
      input$ = toObservable(input, injector);
    } else if (isObservable(input)) {
      input$ = input;
    } else {
      input$ = of(input);
    }

    const instanceSub = input$.subscribe((value) => source$.next(value));
    sourceSub.add(instanceSub);

    return instanceSub;
  };
  rxMethodFn.unsubscribe = sourceSub.unsubscribe.bind(sourceSub);

  return rxMethodFn;
}

function toObservable<T>(source: Signal<T>, injector: Injector): Observable<T> {
  const subject = new Subject<T>();

  const watcher = effect(
    () => {
      let value: T;
      try {
        value = source();
      } catch (err) {
        untracked(() => subject.error(err));
        return;
      }
      untracked(() => subject.next(value));
    },
    { injector, manualCleanup: true }
  );

  injector.get(DestroyRef).onDestroy(() => {
    watcher.destroy();
    subject.complete();
  });

  return subject.asObservable();
}
