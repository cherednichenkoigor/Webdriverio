import defaultsDeep from "lodash/defaultsDeep";

export class Model {
    constructor(attributes = {}) {
      defaultsDeep(this, attributes, this.defaults);
    }
  }