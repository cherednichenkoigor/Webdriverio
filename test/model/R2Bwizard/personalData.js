import { Model } from "../baseModel.js";

export class PersonalData extends Model {
  get defaults() {
    return {
        greating: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    };
  }
}