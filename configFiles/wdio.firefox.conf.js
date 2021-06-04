import merge from 'deepmerge'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    capabilities: [
          
        {   
            maxInstances: 1,              
            browserName: 'firefox', 
            'moz:firefoxOptions': {
                args: [
                    '--width=1920',
                    '--height=1080',
                    '--headless',
                ],
            },
            'wdio-ics:options': {
                logName: 'firefox-desctop',
            },         
        },
        {
            maxInstances: 1, 
            browserName: 'firefox', 
            'moz:firefoxOptions': {
                args: [
                    '--width=768',
                    '--height=860',
                    '--headless',
                ],
            },
            'wdio-ics:options': {
                logName: 'firefox-tablet',
            },         
        },
        {
            maxInstances: 1, 
            browserName: 'firefox', 
            'moz:firefoxOptions': {
                args: [
                    '--width=375',
                    '--height=860',
                    '--headless',
                ],
            },
            'wdio-ics:options': {
                logName: 'firefox-mobile',
            },         
        },
    ],
}, { clone: false })

