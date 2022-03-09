import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { fakeAsync } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;

  const httpClient: any = {
    get: jasmine.createSpy('get')
  };
  const authStore: any = {
    setLoading: jasmine.createSpy('setLoading').and.callThrough(),
    update: jasmine.createSpy('update').and.callThrough(),
    setError: jasmine.createSpy('setError').and.callThrough()
  };

  beforeEach(() => {
    service = new AuthService(
      httpClient,
      authStore
    );
  });

  it('should be able to login', () => {
    const data = new Subject();
    httpClient.get.and.returnValue(data);
    service.login({
      email: '',
      password: '',
    });
    expect(authStore.setLoading).toHaveBeenCalledWith(true);
    data.next({
      id: '',
      name: '',
      email: '',
      avatarUrl: '',
      createdAt: '',
      updatedAt: '',
      issueIds: []
    });
    expect(httpClient.get).toHaveBeenCalledWith('/assets/data/auth.json');
    expect(authStore.update).toHaveBeenCalled();
  });
  it('should not be able to login', fakeAsync(() => {
    const data = new Subject();
    httpClient.get.and.returnValue(data);
    service.login({
      email: '',
      password: '',
    });
    authStore.update.and.callFake(() => {
      throw new Error('Something bad happened');
    });
    expect(authStore.setLoading).toHaveBeenCalledWith(true);
    authStore.setLoading.calls.reset();
    data.next({
      id: '',
      name: '',
      email: '',
      avatarUrl: '',
      createdAt: '',
      updatedAt: '',
      issueIds: []
    });

    expect(authStore.setLoading).toHaveBeenCalledWith(false);
    expect(authStore.setError).toHaveBeenCalled();
  }));
});
