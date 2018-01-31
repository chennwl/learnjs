/**
 * Sequelize提供了一个sync()方法，可以自动创建数据库
 */

require('babel-core/register')({
    presets: ['stage-3']
});

const model = require('./model.js');
model.sync();

console.log('init db ok.');
process.exit(0);