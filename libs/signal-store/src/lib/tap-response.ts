import { catchError, EMPTY, Observable, tap } from 'rxjs';

type TapResponseObserver<T, E> = {
  next: (value: T) => void;
  error: (error: E) => void;
  complete?: () => void;
  finalize?: () => void;
};

export function tapResponse<T, E = unknown>(
  observer: TapResponseObserver<T, E>
): (source$: Observable<T>) => Observable<T> {
  return (source) =>
    source.pipe(
      tap({
        next: observer.next,
        complete: observer.complete,
        finalize: observer.finalize,
      }),
      catchError((error) => {
        observer.error(error);
        return EMPTY;
      })
    );
}
