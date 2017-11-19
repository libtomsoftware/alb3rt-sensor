const core = require('alb3rt-core'),
    motion = require('../../motion'),
    CONFIG = core.config,
    STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;

module.exports = new class Alb3rtSensorResourcesMotion {
    constructor() {}

    post(request, response) {
        motion.report(request.body);

        core.api.responder.send(response, {
            status: STATUS_CODE.OK
        });
    }
};
