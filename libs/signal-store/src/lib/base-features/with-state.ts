import {
  EmptyFeatureResult,
  InnerSignalStore,
  SignalsDictionary,
  SignalStoreFeature,
  SignalStoreFeatureResult,
} from '../signal-store-models';
import { NotAllowedStateCheck } from '../signal-state-models';
import { selectSignal } from '../select-signal';
import { toDeepSignal } from '../deep-signal';
import { excludeKeys } from './helpers';

export function withState<State extends Record<string, unknown>>(
  state: State & NotAllowedStateCheck<State>
): SignalStoreFeature<
  EmptyFeatureResult,
  EmptyFeatureResult & {
    state: State;
  }
>;
export function withState<State extends Record<string, unknown>>(
  stateFactory: () => State & NotAllowedStateCheck<State>
): SignalStoreFeature<
  EmptyFeatureResult,
  EmptyFeatureResult & {
    state: State;
  }
>;
export function withState<State extends Record<string, unknown>>(
  stateOrFactory: State | (() => State)
): SignalStoreFeature<
  SignalStoreFeatureResult,
  EmptyFeatureResult & { state: State }
> {
  return (store) => {
    const state =
      typeof stateOrFactory === 'function' ? stateOrFactory() : stateOrFactory;
    const stateKeys = Object.keys(state);

    store.internals.$update(state);

    const slices = stateKeys.reduce((acc, key) => {
      const slice = selectSignal(() => store.internals.$state()[key]);
      return { ...acc, [key]: toDeepSignal(slice) };
    }, {} as SignalsDictionary);
    const signals = excludeKeys(store.signals, stateKeys);
    const methods = excludeKeys(store.methods, stateKeys);

    return {
      ...store,
      slices: { ...store.slices, ...slices },
      signals,
      methods,
    } as InnerSignalStore<State>;
  };
}
