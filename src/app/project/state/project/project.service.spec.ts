import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  const httpClient: any = {};
  const projectStore: any = {
    setLoading: vi.fn()
  };

  beforeEach(() => {
    service = new ProjectService(
      httpClient,
      projectStore
    );
    service.baseUrl = '';
  });

  it('should be able to set loading ', () => {
    service.setLoading(true);
    expect(projectStore.setLoading).toHaveBeenCalledWith(true);
  });
});
