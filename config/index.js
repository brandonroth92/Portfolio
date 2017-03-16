// get production or test MongoDB uri based on NODE_ENV variable
var env = process.env.NODE_ENV || 'global'
  , cfg = require('./config.'+env);

// export cfg object containing appropriate MongoDB uri
module.exports = cfg;