import { API_HOST } from "../constants";

import BetroApi from "@prijindal/betro-js-client/src";

const BetroApiObject = new BetroApi(API_HOST);

export default BetroApiObject;
