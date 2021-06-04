import { Model } from "../baseModel.js";

export class FinancialDada extends Model {
  get defaults() {
    return {
      householdIncome: "",
      applicableResources: ""
    };
  }
}


