import '../avatar';
import '../avatar-group';
import '../avatar-image';
import '../avatar-text';

export default {
  decorators: [(story) => /*html*/ `<div class="canvas">${story()}</div>`],
  title: 'Components/Avatar',
};

export const Playground = {
  args: {
    hue: 10,
    lightness: 50,
    saturation: 50,
    size: 4,
    text: 'HS',
    variant: 'circle',
  },

  argTypes: {
    hue: {
      name: 'hue',
      type: {
        name: 'number',
      },
    },
    lightness: {
      name: 'lightness',
      type: {
        name: 'number',
      },
    },
    saturation: {
      name: 'saturation',
      type: {
        name: 'number',
      },
    },
    size: {
      name: 'size',
      type: {
        name: 'number',
      },
    },
    variant: {
      control: {
        labels: {
          circle: 'circle',
          rounded: 'rounded',
          [undefined]: 'square',
        },
        type: 'select',
      },
      name: 'data-color',
      options: [undefined, 'rounded', 'circle'],
      type: {
        name: 'string',
        required: true,
      },
    },
  },

  name: 'Playground',

  render: ({ text, ...props }) => /*html*/ `
    <style>
      .wrapper {
        display: inline-flex;
        gap: 0.75rem;
      }
    </style>
    <div class="wrapper">
      <ui-avatar ${props.variant ? `data-variant="${props.variant}"` : ''}>
        <ui-avatar-image
          ${props.size ? `data-size="${props.size}"` : ''}
          data-src="data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCIgZmlsbD0ibm9uZSI+PG1ldGFkYXRhPjxyZGY6UkRGPjxjYzpXb3JrPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz48ZGM6dGl0bGU+QWR2ZW50dXJlciBOZXV0cmFsPC9kYzp0aXRsZT48ZGM6Y3JlYXRvcj48Y2M6QWdlbnQ+PGRjOnRpdGxlPkxpc2EgV2lzY2hvZnNreTwvZGM6dGl0bGU+PC9jYzpBZ2VudD48L2RjOmNyZWF0b3I+PGRjOnNvdXJjZT5odHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2xpc2NoaXNfYWR2ZW50dXJlcy88L2RjOnNvdXJjZT48Y2M6bGljZW5zZSByZGY6cmVzb3VyY2U9Imh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS80LjAvIi8+PC9jYzpXb3JrPjxjYzpMaWNlbnNlIHJkZjphYm91dD0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzQuMC8iPjxjYzpwZXJtaXRzIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI1JlcHJvZHVjdGlvbiIvPjxjYzpwZXJtaXRzIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rpc3RyaWJ1dGlvbiIvPjxjYzpwZXJtaXRzIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rlcml2YXRpdmVXb3JrcyIvPjxjYzpyZXF1aXJlcyByZGY6cmVzb3VyY2U9Imh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyNOb3RpY2UiLz48Y2M6cmVxdWlyZXMgcmRmOnJlc291cmNlPSJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjQXR0cmlidXRpb24iLz48L2NjOkxpY2Vuc2U+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PG1hc2sgaWQ9ImF2YXRhcnNSYWRpdXNNYXNrIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgcng9IjAiIHJ5PSIwIiB4PSIwIiB5PSIwIiBmaWxsPSIjZmZmIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjYXZhdGFyc1JhZGl1c01hc2spIj48cmVjdCBmaWxsPSJyZ2JhKDI0MiwgMjExLCAxNzcsIDEpIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeD0iMCIgeT0iMCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNzkgLTMyMikiPjxwYXRoIGQ9Ik01MDYuMDMgNDYxLjEyYzUuNDktMS4xNiAxMS42NiAyLjQ0IDE2LjkyIDMuOTggMjIuMTUgNy4wOCA0NS45IDkuNDYgNjkuMDYgNy43NCA2LjIzLS42IDEyLjgtMi40MSAxOS4wNC0yLjAxIDYuMi42NiAxMC4zOSA2LjA3IDEwLjk1IDEyLjA2Ljc2IDEwLjgtLjggMjItNS4wOCAzMS45OS01Ljk0IDEzLjk5LTE2Ljg5IDI1LjcyLTMwLjQ0IDMyLjYtMjEuMzUgMTEuMDgtNDguMzUgOS4wMi02Ny43NS01LjIxLTE0LjY5LTEwLjQ5LTI0LjctMjcuMzQtMjYuNjctNDUuMy0uODUtOC42OS0uMzgtMTcuNCAyLjA5LTI1LjggMS4zOS01LjI0IDYuNzgtOSAxMS44OC0xMC4wNVpNNDI4LjI1IDQ2Ni43NWMzLjYzIDIuMjMgNS44MiA2LjYgNy43OCAxMC4yNSA1LjU0IDEwLjc5IDcgMjMuMTggNC45NSAzNS4wNy0yLjA1IDEwLjU4LTcuMTYgMjAuNTEtMTQuNzMgMjguMi04LjI1IDguNDctMTkuMzEgMTQuMTUtMzEuMDEgMTUuODgtMTQuMzcgMi4yMi0yOS41NC0xLjQ4LTQxLjE2LTEwLjI1LTExLjI3LTguMzEtMTkuMDgtMjEuMDctMjEuMzQtMzQuODktLjU3LTMuNjgtMS41Mi03LjYuMTUtMTEuMTMgMS42NS00LjE5IDUuNjctNy4wOSAxMC4xMS03LjYgNC45NC0uNTkgOS44Ny0xLjE4IDE0Ljc4LTIgMTguMzgtMy4zIDM1LjI2LTExLjI1IDUwLjM2LTIyLjEyIDUuODgtNS4xMSAxMy41NC01LjQ2IDIwLjExLTEuNDFaIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTUxMy40MSA0NjcuNjVjMTIuMjEgNS4wMyAyNS41MSA3Ljk3IDM4LjU3IDkuNzEgMTUuNjQgMi4wMiAzMS4zOSAyLjU5IDQ3LjA0LjMxIDMuODctLjU2IDguMTEtMS44MiAxMS45OS0xLjUzIDIuNDMuMDggNC4zNSAyLjY3IDQuODIgNC44NyAxLjY1IDExLjctLjIxIDIzLjc2LTUuNDUgMzQuMzctNi4zNiAxMy4yMi0xNy44OCAyNC4wMS0zMS42IDI5LjI3LTEwLjY2IDQuMjktMjIuNTEgNS40Mi0zMy43NiAzLjAzLTE3LjExLTMuMzktMzIuNDEtMTQuNjgtNDAuNTktMzAuMS02LjktMTIuOTYtOS4zNy0yOS01LjA3LTQzLjE3IDEuNjctNi4xOSA4LjAxLTkuOTMgMTQuMDUtNi43NlpNNDI3Ljc3IDQ3NC4yM2M0Ljc4IDcuMDUgNy41NSAxNS4yNiA4LjM5IDIzLjcyIDEuMjQgMTYuMzktNi4xMyAzMi45Ny0xOS4yNSA0Mi45MS04Ljc5IDYuODMtMTkuODMgMTAuMzUtMzAuOTIgMTAuMy0xMS42MS0uMzgtMjMtNC43MS0zMS42OC0xMi40OC05LjY4LTguNS0xNS43OC0yMC44NC0xNi41NC0zMy43MS0uNDctMy4xOSAyLjEzLTYuNDYgNS4yNi02Ljk1IDMuMjQtLjY3IDYuNjMtLjc4IDkuOTItMS4xOCAxOC41LTIuMjYgMzYuNTktOS42IDUyLjE5LTE5LjY5IDMuMDktMS45MiA1Ljg2LTQuMzEgOC45Ny02LjE4IDQuNC0yLjMgMTAuOTUtMS4xMyAxMy42NiAzLjI2WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01MzMuNTQgNDk2LjkyYzEyLjMtMS4xIDIzLjg5IDguNTMgMjQuMDggMjEuMDguODQgMTEuMDUtNy41NiAyMS4yMi0xOC40NSAyMi44My0xMS45MSAyLjE0LTIzLjkzLTYuODEtMjUuNDEtMTguOC0xLjkyLTEyLjI5IDcuNTEtMjMuOTcgMTkuNzgtMjUuMTFaTTQwMC40OSA1MDUuNWM1Ljk2LTEuMzEgMTIuNjMuODYgMTcuMDYgNC45NiA2LjUzIDUuOTkgOC4xNyAxNi4xMiAzLjcyIDIzLjgxLTQuMTUgNy43OS0xMy42MiAxMS42LTIyLjA4IDkuMzctOC4zNC0yLjE4LTE0LjU0LTkuOTUtMTQuNDItMTguNjQtLjMtOS40NCA2LjU3LTE3LjYgMTUuNzItMTkuNVoiIGZpbGw9IiMwMDAiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3OSAtMzIyKSI+PGcgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTU0NS4wMyAzNzguNWMyNC43Ljk0IDQ4LjA0IDguOTcgNjkuNDUgMjAuOTkgMi4yNiAxLjMyIDQuOTIgMi40OSA2Ljc5IDQuMzMgMS4zIDIuMzktLjM4IDUuMTMtMy4yIDQuMTktMTYuNTgtNi4yMS0zMy41Ni05LjYzLTUxLjA2LTEyLjAyLTIwLjMtMi4zNC0zOS45Mi0zLjY4LTYwLjItLjEzLTMuMi40NC02Ljg3IDIuMTYtMTAuMDggMS41OS0yLjY2LTEuNjktMS4yLTYuMSAxLjI5LTcuMzcgMTMuNjMtOS4zMyAzMC43OS0xMi4xIDQ3LjAxLTExLjU4Wk00MDcuOTkgMzk2LjkyYzMuNTEuNjQgNi42IDEuOTIgOS42MyAzLjc4LS4xNSAxLjItLjI2IDIuNC0uMzMgMy42Mi0yLjcuNzQtNS40NiAxLjEyLTguMjQgMS4zNC0xMy4xNyAxLjE1LTI2LjQ1IDUuMTEtMzguODEgOS42OS0xMi4yMyA0Ljc1LTI0Ljc4IDEwLjY0LTM1LjE5IDE4LjcxLTIuODIgMi4wMy00LjEzIDQuODItOC4wOCA0LjQ3LS41LS45LTEtMS43OS0xLjUxLTIuNjcuODktMS41OSAxLjY4LTMuMTcgMi43Ni00LjY0IDkuNTUtMTMuMTcgMjMuNjQtMjMuMjIgMzguNjEtMjkuMzUgMTIuNy01LjE1IDI3LjYxLTguMDUgNDEuMTYtNC45NVoiLz48L2c+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNzkgLTMyMikiPjxwYXRoIGQ9Ik01MzQuMjkgNTYyLjU2YzcuOTIgMS4xNiAxNS40MSA0LjM2IDIxLjIzIDkuOTIgOC4wOSA3LjU3IDEyLjEyIDE4LjUzIDExLjg2IDI5LjUyLjM0IDkuNzgtMi4zOCAxOS4xMi02LjY4IDI3LjgxLTcuMTIgMTQuMDItMTguMzUgMjYuMDctMzEuOTggMzMuOTMtMTEuODMgNi45Ni0yNS4wOSAxMC40NC0zOC43MiAxMS4zNi0zMC42MyAxLjYxLTYxLjItMTEuODQtODIuMDktMzQuMDQtNi4zOC04LjEyLTExLjg2LTE4LjQ2LTExLjQ2LTI5LjA2LS4wOS03Ljg4IDQuMDItMTUuNjUgMTAuNDUtMjAuMTYgNi45Mi00Ljk3IDE0Ljc3LTYuMzEgMjMuMS02Ljc5IDE0LjIuMTUgMjcuNzkgNC4zMiA0MC4xNyAxMS4xMiA4LjUyLTEyLjU5IDIwLjAxLTIyLjkgMzQuMDMtMjguOTYgOS40Mi00LjIgMTkuODMtNS45NyAzMC4wOS00LjY1WiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik01MzMuNDcgNTY4LjMzYzkuMjQgMS4yOCAxNy45NyA2LjI0IDIyLjkgMTQuMyA1Ljk2IDkuNTkgNi42NSAyMS4wNCAzLjgxIDMxLjc5LTQuMDUtLjU1LTcuOS0uNjktMTEuOTctLjItMTAuODQuNjItMjEuNzMgMy4zNy0zMS45NiA2Ljk2IDEuNDEtNy40OSAyLjUzLTE2LjY1LS41Ny0yMy44NS0xLjctMy44NC01LjQxLTYuMi05LjU4LTQuMzMtNi41OCAzLjEyLTEwLjMgMTEuODktMTMuMDIgMTguMjItNC43NS0xLjYzLTExLjMyLTMuNzgtMTYuMDYtMS4yMy0zLjg5IDIuMTktMy43OCA2LjUzLTIuNDIgMTAuMjYgMi41NiA2LjIxIDcuNzEgMTEuMDggMTIuNjQgMTUuNDQtMTIuMDUgNy45MS0yMi44MSAxNy4yOS0zMS4xNyAyOS4wOS0xNC45NS00Ljc0LTI4LjY3LTEzLjAyLTQwLjAxLTIzLjgyLTYuNzMtNi40NC0xMS45OS0xNS4xNS0xMy42MS0yNC4zOC0xLjEzLTYuMzUuNjYtMTMuMjMgNS4zMS0xNy44MSA0LjQ3LTQuNTkgMTEtNi42NiAxNy4yLTcuNSAxMS43OS0xLjUyIDI0LjQ3IDEuODEgMzUuMjUgNi41IDMuNzUgMS41MiA3LjA5IDMuODMgMTAuNzggNS40MyAyLjY3LjMgMy43MS0zLjQxIDUuMS01LjE1IDkuMDYtMTMuMzUgMjIuOTUtMjQuMTUgMzguNjUtMjguMzYgNS45Ni0xLjgyIDEyLjU3LTEuODcgMTguNzMtMS4zNloiIGZpbGw9IiM4RjJFNDUiLz48cGF0aCBkPSJNNTA4Ljk3IDU5Ny44NmMyLjY0IDIuMzcgMi43NCA2LjggMi44OCAxMC4xMi0uMDggMTAuOTEtMy4xNCAyMS45MS03Ljk3IDMxLjY1LTQuMDEtMi4xLTcuOTMtNC4xNy0xMS4zNS03LjE4LTQuMzItMy43Ny05LjEtNy45Ny0xMS45NS0xMy4wMS0uODktMS40NS0uOTItMy0xLjE2LTQuNjMgNS4xNi0uNzMgOS4xOSAxLjAxIDEzLjgxIDIuODcgMi43OSAxIDMuODYtMS40MSA0Ljk2LTMuNDQgMi40NC01LjU0IDUuMTMtMTMuMzMgMTAuNzgtMTYuMzhaIiBmaWxsPSIjRDMyMDIwIi8+PHBhdGggZD0iTTU1OC42MiA2MTkuOTRjLTIuNiA3LjEyLTYuMzIgMTMuNjktMTEuMDEgMTkuNjMtMy43NyA0Ljc4LTguNTUgOC45LTEzLjAxIDEzLjA1LTkuOTQgOC4xNC0yMi41MiAxMy4zNS0zNS4xMiAxNS41Ny0xMi41MSAxLjk3LTI1LjE4IDEuMi0zNy41MS0xLjU2IDguMTItMTEuMTMgMTguNjUtMTkuOTIgMzAuMy0yNy4xNSAzLjc2IDIuMzMgNy41OCA1LjE2IDExLjc2IDYuNjUgMS4zOS42MiAyLjc3LS40MiAzLjU2LTEuNTEgMy4xNy00LjkgNC44Ny0xMC4wMiA2Ljc4LTE1LjQyLjM4LTEuNDMgMS42Mi0xLjU1IDIuOC0yLjEgMTIuOTgtNC43NCAyNy41Ny04LjEzIDQxLjQ1LTcuMTZaIiBmaWxsPSIjRUE4NjlFIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNzkgLTMyMikiLz48L2c+PC9zdmc+"
        />
      </ui-avatar>
      <ui-avatar ${props.variant ? `data-variant="${props.variant}"` : ''}>
        <ui-avatar-text 
          ${props.hue ? `data-hue="${props.hue}"` : ''}
          ${props.lightness ? `data-lightness="${props.lightness}"` : ''}
          ${props.saturation ? `data-saturation="${props.saturation}"` : ''}
          ${props.size ? `data-size="${props.size}"` : ''}>
            ${text}
        </ui-avatar-text>
      </ui-avatar>
    </div>
  `,
};
