import { Subject } from "subjecto";
import { useState, useEffect } from "react";

Subject.prototype.hook = function () {
  const [value, setValue] = useState(this.value);
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

export default Subject as Subject;
