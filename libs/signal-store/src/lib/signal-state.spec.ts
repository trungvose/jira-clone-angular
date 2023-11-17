import { signalState } from './signal-state';
import { ApplicationRef, Component, effect } from '@angular/core';
import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { state } from '@angular/animations';

describe('Signal State', () => {
  const initialState = {
    user: {
      firstName: 'John',
      lastName: 'Smith',
    },
    foo: 'bar',
    numbers: [1, 2, 3],
  };

  const setup = () => signalState(initialState);

  it('should support nested signals', () => {
    const state = setup();

    expect(state()).toBe(initialState);
    expect(state.user()).toBe(initialState.user);
    expect(state.user.firstName()).toBe(initialState.user.firstName);
  });

  it('should allow updates', () => {
    const state = setup();
    state.$update((state) => ({
      ...state,
      user: { firstName: 'Johannes', lastName: 'Schmidt' },
    }));
    expect(state()).toEqual({
      ...initialState,
      user: { firstName: 'Johannes', lastName: 'Schmidt' },
    });
  });

  it('should update immutably', () => {
    const state = setup();
    state.$update((state) => ({
      ...state,
      foo: 'bar',
      numbers: [3, 2, 1],
    }));
    expect(state.user()).toBe(initialState.user);
    expect(state.foo()).toBe(initialState.foo);
    expect(state.numbers()).not.toBe(initialState.numbers);
  });

  // TODO: Find a better way to execute effects
  describe('Effects in Signals', () => {
    @Component({
      template: '',
    })
    class TestComponent {
      userFired = 0;
      numbersFired = 0;
      state = setup();

      constructor() {
        effect(() => {
          this.userFired++;
          this.state.user();
        });

        const numbersListener = effect(() => {
          this.numbersFired++;
          this.state.numbers();
        });
      }
    }

    it('should not fire all signals on update', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const component = fixture.componentInstance;

      expect(component.numbersFired).toBe(0);
      expect(component.userFired).toBe(0);

      fixture.detectChanges();

      expect(component.numbersFired).toBe(1);
      expect(component.userFired).toBe(1);

      component.state.$update((state) => ({ ...state, numbers: [4, 5, 6] }));
      fixture.detectChanges();

      expect(component.numbersFired).toBe(2);
      expect(component.userFired).toBe(1);
    }));
  });
});
