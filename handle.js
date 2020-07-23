const executionTime = require("execution-time");
const debug = require('./debug')

module.exports = handler => async (req, res) => {

    const perf = executionTime();
    perf.start();
    const createMeta = () => ({
        perf: perf.stop().time
    });

    try {

        let args = null;
        if (req.method === "POST") {
            args = req.body;
        }
        if (req.method === "GET") {
            args = req.params;
        }

        const data = await handler({ req, res })(args);

        res.send({
            status: "success",
            meta: createMeta(),
            data
        });

    } catch (e) {

        debug(e)

        res.send({
            status: "error",
            meta: createMeta(),
            message: e.message
        });

    }
};
