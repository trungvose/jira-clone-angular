import { IconDefinition } from '@ant-design/icons-angular';
import {
  PlusOutline,
  QuestionCircleFill,
  SearchOutline,
  CloseOutline,
  TwitterOutline,
  EditOutline,
  BoldOutline,
  ItalicOutline,
  SnippetsOutline,
  FontSizeOutline,
  LinkOutline,
  PictureOutline,
  UnorderedListOutline,
  OrderedListOutline,
  CarryOutOutline,
  TagOutline
} from '@ant-design/icons-angular/icons';

const PROJECT_ICONS: IconDefinition[] = [
  QuestionCircleFill,
  PlusOutline,
  SearchOutline,
  CloseOutline,
  TwitterOutline,
  EditOutline
];

const TEXT_EDITOR_ICONS: IconDefinition[] = [
  BoldOutline,
  ItalicOutline,
  SnippetsOutline,
  FontSizeOutline,
  LinkOutline,
  PictureOutline,
  UnorderedListOutline,
  OrderedListOutline,
  CarryOutOutline,
  TagOutline
];

export const NZ_JIRA_ICONS =[
  ...PROJECT_ICONS,
  ...TEXT_EDITOR_ICONS
]