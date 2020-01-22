function createLogger() {
    const SimpleNodeLogger = require('simple-node-logger'),
        opts = {
            logFilePath: './logs/consoleLog.log',
            timestampFormat: 'MM-DD-YYY HH:mm:ss',
        },
        log = SimpleNodeLogger.createSimpleLogger(opts);
}

exports.createLogger = createLogger
