import { DestroyRef, inject, Injectable, signal, Type } from '@angular/core';
import { defaultEqualityFn } from './select-signal';
import {
  EmptyFeatureResult,
  InnerSignalStore,
  MergeFeatureResults,
  SignalStore,
  SignalStoreConfig,
  SignalStoreFeature,
  SignalStoreHooks,
  SignalStoreFeatureResult,
} from './signal-store-models';
import { signalStateUpdateFactory } from './signal-state';

export function signalStore<F1 extends SignalStoreFeatureResult>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>
): Type<SignalStore<F1>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>
): Type<SignalStore<MergeFeatureResults<[F1, F2]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult,
  F7 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>,
  f7: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>, F7>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult,
  F7 extends SignalStoreFeatureResult,
  F8 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>,
  f7: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>, F7>,
  f8: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7]>, F8>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7, F8]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult,
  F7 extends SignalStoreFeatureResult,
  F8 extends SignalStoreFeatureResult,
  F9 extends SignalStoreFeatureResult
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>,
  f7: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>, F7>,
  f8: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7]>, F8>,
  f9: SignalStoreFeature<
    MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7, F8]>,
    F9
  >
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7, F8, F9]>>>;

export function signalStore<F1 extends SignalStoreFeatureResult>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>
): Type<SignalStore<F1>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>
): Type<SignalStore<MergeFeatureResults<[F1, F2]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult,
  F7 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>,
  f7: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>, F7>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult,
  F7 extends SignalStoreFeatureResult,
  F8 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>,
  f7: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>, F7>,
  f8: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7]>, F8>
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7, F8]>>>;
export function signalStore<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult,
  F7 extends SignalStoreFeatureResult,
  F8 extends SignalStoreFeatureResult,
  F9 extends SignalStoreFeatureResult
>(
  config: SignalStoreConfig,
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<MergeFeatureResults<[F1, F2]>, F3>,
  f4: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3]>, F4>,
  f5: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4]>, F5>,
  f6: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5]>, F6>,
  f7: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6]>, F7>,
  f8: SignalStoreFeature<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7]>, F8>,
  f9: SignalStoreFeature<
    MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7, F8]>,
    F9
  >
): Type<SignalStore<MergeFeatureResults<[F1, F2, F3, F4, F5, F6, F7, F8, F9]>>>;

export function signalStore(
  ...args: [SignalStoreConfig, ...SignalStoreFeature[]] | SignalStoreFeature[]
): Type<SignalStore<any>> {
  const signalStoreArgs = [...args];

  const config: Partial<SignalStoreConfig> =
    'providedIn' in signalStoreArgs[0]
      ? (signalStoreArgs.shift() as SignalStoreConfig)
      : {};
  const features = signalStoreArgs as SignalStoreFeature[];

  @Injectable({ providedIn: config.providedIn || null })
  class SignalStore {
    constructor() {
      const { signalStore, hooks } = signalStoreFactory(features);

      for (const key in signalStore) {
        (this as any)[key] = signalStore[key];
      }

      hooks.onInit?.();

      if (hooks.onDestroy) {
        inject(DestroyRef).onDestroy(() => hooks.onDestroy!());
      }
    }
  }

  return SignalStore;
}

function signalStoreFactory(features: SignalStoreFeature[]): {
  signalStore: SignalStore<any>;
  hooks: SignalStoreHooks;
} {
  const stateSignal = signal<Record<string, unknown>>(
    {},
    { equal: defaultEqualityFn }
  );

  const innerStore = features.reduce<InnerSignalStore>(
    (store, feature) => feature(store),
    {
      internals: {
        $state: stateSignal.asReadonly(),
        $update: signalStateUpdateFactory(stateSignal),
      },
      slices: {},
      signals: {},
      methods: {},
      hooks: {},
    }
  );

  return {
    signalStore: {
      ...innerStore.internals,
      ...innerStore.slices,
      ...innerStore.signals,
      ...innerStore.methods,
    },
    hooks: innerStore.hooks,
  };
}
