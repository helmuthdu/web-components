import '../breadcrumb';
import '../breadcrumbs';

export default {
  render: (args) => `
    <ui-breadcrumbs label="${args.label || ''}">
      <ui-breadcrumb href="#">Home</ui-breadcrumb>
      <ui-breadcrumb href="#">Library</ui-breadcrumb>
      <ui-breadcrumb>Data</ui-breadcrumb>
    </ui-breadcrumbs>
  `,
  title: 'Components/Breadcrumbs',
};

export const Default = {
  args: {
    label: 'Breadcrumb',
  },
};

export const CustomSeparator = {
  args: {
    label: 'Breadcrumb',
  },
  render: (args) => `
    <ui-breadcrumbs label="${args.label || ''}">
      <ui-breadcrumb href="#">
        Home
        <span slot="separator">></span>
      </ui-breadcrumb>
      <ui-breadcrumb href="#">
        Library
        <span slot="separator">></span>
      </ui-breadcrumb>
      <ui-breadcrumb>Data</ui-breadcrumb>
    </ui-breadcrumbs>
  `,
};
