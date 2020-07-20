import { CreateUpdateTagParamsDto, ProjectIssueTagDto, ProjectIssueTagStyle } from '@ngvn/api/dtos';
import { ProjectIssueTag } from '@ngvn/api/project';
import { Profile, ProfileBase, AutoMapper, mapFrom } from 'nestjsx-automapper';
import { ignoreBaseProperties } from './utils/ignore-base-properties.util';

@Profile()
export class ProjectIssueTagProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProjectIssueTag, ProjectIssueTagDto).forMember(
      (d) => d.styles,
      mapFrom((s) => {
        const styles = new ProjectIssueTagStyle();
        styles.color = s.textColor;
        styles.backgroundColor = s.backgroundColor;
        return styles;
      }),
    );

    ignoreBaseProperties(mapper.createMap(CreateUpdateTagParamsDto, ProjectIssueTag));
  }
}
