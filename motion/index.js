const FILE_ID = 'motion',
    core = require('alb3rt-core'),
    CONFIG = core.config,
    http = core.http,
    logger = core.logger;

module.exports = new class Alb3rtSensorMotion {
    constructor() {}

    report(data) {
        const hubUrl = CONFIG.URL.SENSORS_HUB;

        logger.log(FILE_ID, 'motion detected, reporting to hub...');

        if (hubUrl) {
            http.post({
                url: `http://${hubUrl}/api/motion`,
                body: data
            }).then(() => {
                logger.log(FILE_ID, 'motion reported to hub');
            }).catch(error => {
                logger.error(FILE_ID, `Motion reporting error. Status: ${error}`)
            });
        }
    }
};
