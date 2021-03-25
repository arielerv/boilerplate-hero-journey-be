const mongoose = require('mongoose');
const concat = require('lodash/concat');
const every = require('lodash/every');
const pkg = require('../../package.json');

/**
 * Creates the status object
 * @param {Array<{status}>} deps Required dependencies to work.
 * @param {Array<{status}>} optionalDeps Optional dependencies to work.
 * @returns {{name, status: string, deps}} Returns the status of this app.
 */
const generateStatus = (deps, optionalDeps = []) => ({
    deps: concat(deps, optionalDeps),
    name: pkg.name,
    status: every(deps, ({status: 'ok'}))
        ? every(optionalDeps, ({status: 'ok'})) ? 'ok' : 'degraded'
        : 'down'
});

class StatusService {
    static getStatus() {
        return generateStatus([StatusService.getDBStatus()]);
    }

    static getHealth() {
        return StatusService.getDBStatus();
    }

    static getDBStatus() {
        const connected = mongoose.connection.readyState === 1;
        return {name: 'MongoDB', status: connected ? 'ok' : 'down'};
    }
}

module.exports = StatusService;
