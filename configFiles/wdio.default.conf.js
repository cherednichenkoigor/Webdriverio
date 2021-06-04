import merge from 'deepmerge'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    capabilities: [
          
        {   
            maxInstances: 1, 
            browserName: 'chrome', 
            'goog:chromeOptions': {
                args: [
                    'window-size=1920,1080',
                    '--headless',
                ],
            },
            'wdio-ics:options': {
                logName: 'chrome-default',
            },         
        }
    ],
}, { clone: false })