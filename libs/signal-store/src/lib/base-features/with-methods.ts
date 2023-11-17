import {
  EmptyFeatureResult,
  InnerSignalStore,
  MethodsDictionary,
  Prettify,
  SignalsDictionary,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  SignalStoreInternals,
  SignalStoreSlices,
} from '../signal-store-models';
import { excludeKeys } from './helpers';

export function withMethods<
  Input extends SignalStoreFeatureResult,
  Methods extends MethodsDictionary
>(
  methodsFactory: (
    store: Prettify<
      SignalStoreInternals<Prettify<Input['state']>> &
        SignalStoreSlices<Input['state']> &
        Input['signals'] &
        Input['methods']
    >
  ) => Methods
): SignalStoreFeature<Input, EmptyFeatureResult & { methods: Methods }> {
  return (store) => {
    const methods = methodsFactory({
      ...store.internals,
      ...store.slices,
      ...store.signals,
      ...store.methods,
    });
    const methodsKeys = Object.keys(methods);
    const slices = excludeKeys(store.slices, methodsKeys);
    const signals = excludeKeys(store.signals, methodsKeys);

    return {
      ...store,
      slices,
      signals,
      methods: { ...store.methods, ...methods },
    } as InnerSignalStore<Record<string, unknown>, SignalsDictionary, Methods>;
  };
}
