export function makeQuerablePromise(promise: any) {
  // Don't modify any promise that has been already modified.
  if (promise.isFulfilled) return promise;

  // Set initial state
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;
  var data: any = null;

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function (v: any) {
      isFulfilled = true;
      isPending = false;
      data = v;
      return v;
    },
    function (e: any) {
      isRejected = true;
      isPending = false;
      throw e;
    }
  );

  result.isFulfilled = function () {
    return isFulfilled;
  };
  result.isPending = function () {
    return isPending;
  };
  result.isRejected = function () {
    return isRejected;
  };
  result.getData = function () {
    return data;
  };
  return result;
}
