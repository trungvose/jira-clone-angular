
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);
import "../src/styles.scss";


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true }
}