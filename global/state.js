import { PRODUCT_KEY } from "../contains/key_name.js";
import { getFromLocalStorage } from "../helpers/storage.helper.js";

export const cart = getFromLocalStorage(PRODUCT_KEY) || [];
