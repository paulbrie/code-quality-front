function createWorker(workerFunction: any): Worker {
  // here is the trick to convert the above function to string
  const dataObj = typeof workerFunction === 'string' ? workerFunction : "(" + workerFunction + ")();";
  // firefox adds "use strict"; to any function which might block worker execution so knock it off
  const blob = new Blob([dataObj.replace('"use strict";', "")], {
    type: "application/javascript",
  });
  return new Worker(URL.createObjectURL(blob), { type: "module", name: 'test' });
  
}

export default createWorker;
