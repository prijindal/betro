import { connection } from "./connection";

connection({
  synchronize: true,
  dropSchema: false,
  cache: false,
});
