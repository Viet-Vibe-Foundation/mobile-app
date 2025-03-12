let timeOut: NodeJS.Timeout;

// time count by millisecond
export const debouce = (callbackFunc: () => void, time: number) => {
  clearTimeout(timeOut);
  timeOut = setTimeout(callbackFunc, time);
};
