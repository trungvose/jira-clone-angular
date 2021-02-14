import { Meta, Story } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent
} as Meta;

const avatarUrl =
  'https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_128/v1593253478/trung-vo_bioxmc.png';

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  component: AvatarComponent,
  props: args
});

export const Rounded: Story<AvatarComponent> = Template.bind({});
Rounded.args = {
  avatarUrl,
  size: 64
};

export const Square: Story<AvatarComponent> = Template.bind({});
Square.args = {
  avatarUrl,
  size: 64,
  rounded: false
};
