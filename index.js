const core = require('alb3rt-core'),
    logger = core.logger,
    python = core.python,
    FILE_ID = 'index';

module.exports = new class Alb3rtSensor {
    constructor() {
        // ['detection-test'].forEach(id => {
        //     this.run(id);
        // });
    }

    run(id) {
        python.run(id, () => {
            logger.log(FILE_ID, `Python script '${id}' run successfully.`);
        });
    }
};
