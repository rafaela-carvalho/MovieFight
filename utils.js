// With debounce() we have the chance to use the function in other places inside the code.

// clearTimeout: even before our code was executed, we already canceled the timeoutId, for then create another through setTimeout.

// (...args) is essentially the same as (arg1, arg2, arg3).

// apply: call the function as we normally would and take all the arguments, or whatever is inside of that array right there, and pass them in as separete arguments to the original function. It keeps tracking of however many arguments we need to pass through.

// delay: every delay time the input is executed again.

const debounce = (func, delay = 2000) => {
  let timeoutId;
  return (...args) => {    
    // if timeoutId is defined, we clear the timeout.
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // set up the waiting timer for then execute the whole call
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay)
  };
};
