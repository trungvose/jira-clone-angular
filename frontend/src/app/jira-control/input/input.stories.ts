import { ReactiveFormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputComponent } from './input.component';

export default {
  title: 'Components/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [InputComponent]
    })
  ],
  argTypes: {
    placeholder: {
      control: 'text'
    }
  }
} as Meta;

const Template: Story<InputComponent> = (args: InputComponent) => ({
  component: InputComponent,
  props: args
});

export const Flat: Story<InputComponent> = Template.bind({});
Flat.args = {
  containerClassName: 'flat text-textMedium',
  placeholder: 'Search'
};
