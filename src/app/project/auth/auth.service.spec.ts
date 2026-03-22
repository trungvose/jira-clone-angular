import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  const httpClient: any = {
    get: vi.fn()
  };
  const authStore: any = {
    setLoading: vi.fn(),
    update: vi.fn(),
    setError: vi.fn()
  };

  beforeEach(() => {
    service = new AuthService(
      httpClient,
      authStore
    );
  });

  it('should be able to login', () => {
    const data = new Subject();
    httpClient.get.mockReturnValue(data);
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
  it('should not be able to login', () => {
    const data = new Subject();
    httpClient.get.mockReturnValue(data);
    service.login({
      email: '',
      password: '',
    });
    authStore.update.mockImplementation(() => {
      throw new Error('Something bad happened');
    });
    expect(authStore.setLoading).toHaveBeenCalledWith(true);
    authStore.setLoading.mockReset();
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
  });
});
