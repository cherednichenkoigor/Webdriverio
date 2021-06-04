import merge from 'deepmerge'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    
    capabilities: [          
        {
            maxInstances: 1, 
            browserName: 'safari',
            'wdio-ics:options': {
                logName: 'safari-mobile',
            },
        },
    ],

    before: function (capabilities, specs) {
        browser.setWindowSize(375, 860);
    },
    
 }, { clone: false })

