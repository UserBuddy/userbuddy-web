
export const flexHorizontal = `
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
`;

export const flexVertical = `
  ${flexHorizontal}
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height:0;
`;

export const flexSpacer = `
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
`;

export const flexSpacerShrink = `
  ${flexSpacer}
  flex-shrink: 1;
`;
