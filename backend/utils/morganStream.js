
import logger from "./logger.js";

const stream={
    write:(message)=>{
        logger.http(message.trim());
    }
};

export default stream;