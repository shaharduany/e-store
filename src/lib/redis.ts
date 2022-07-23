import { Tedis } from "tedis";
import { REDIS_PORT } from "./secrets";

const tedis = new Tedis({
    host: "127.0.0.1",
    port: +REDIS_PORT
});

export default tedis;