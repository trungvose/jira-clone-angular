import { Meta, Story } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'Components/Button',
  component: ButtonComponent
} as Meta;

interface ButtonProps extends ButtonComponent {
  label: string;
}

const Template: Story<ButtonComponent> = ({ label, className }: Partial<ButtonProps>) => ({
  component: ButtonComponent,
  moduleMetadata: {
    declarations: [ButtonComponent], // Removed if no template
    imports: []
  },
  template: `<j-button className='${className}'>${label}</j-button>`
});

export const Primary: Story<ButtonProps> = Template.bind({});
Primary.args = {
  className: 'btn-primary',
  label: 'Primary'
};

export const Secondary: Story<ButtonProps> = Template.bind({});
Secondary.args = {
  className: 'btn-secondary',
  label: 'Secondary'
};

export const Empty: Story<ButtonProps> = Template.bind({});
Empty.args = {
  icon: 'times',
  className: 'btn-empty',
  label: 'Cancel'
};
