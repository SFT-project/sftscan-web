export const ellipsis = ({
  startLength = 4,
  endLength = 4,
  placeholder = '...',
  defaultDisplay = '--',
} = {}) => (value?: string): string => {
  if (!value) {
    return defaultDisplay;
  }
  if (value.length <= startLength + endLength) {
    return value;
  }
  return `${value.slice(0, startLength)}${placeholder}${value.slice(value.length - endLength, value.length)}`;
};