import {
  EmptyFeatureResult,
  Prettify,
  SignalStoreFeature,
  SignalStoreInternals,
  SignalStoreSlices,
  SignalStoreFeatureResult,
} from '../signal-store-models';

type HooksFactory<Input extends SignalStoreFeatureResult> = (
  store: Prettify<
    SignalStoreInternals<Prettify<Input['state']>> &
      SignalStoreSlices<Input['state']> &
      Input['signals'] &
      Input['methods']
  >
) => void;

export function withHooks<Input extends SignalStoreFeatureResult>(hooks: {
  onInit?: HooksFactory<Input>;
  onDestroy?: HooksFactory<Input>;
}): SignalStoreFeature<Input, EmptyFeatureResult> {
  return (store) => {
    const createHook = (name: keyof typeof hooks) => {
      const hook = hooks[name];
      const currentHook = store.hooks[name];

      return hook
        ? () => {
            currentHook?.();
            hook({
              ...store.internals,
              ...store.slices,
              ...store.signals,
              ...store.methods,
            });
          }
        : currentHook;
    };

    return {
      ...store,
      hooks: {
        onInit: createHook('onInit'),
        onDestroy: createHook('onDestroy'),
      },
    };
  };
}
