module.exports = {
    'projectId': '4b7344',
    e2e: {
        video: true, // Enable or disable video recording
        videosFolder: 'cypress/videos', // Specifies the folder where videos will be saved
        screenshotOnRunFailure: true, // Enable or disable automatic screenshots on test failure
        screenshotsFolder: 'cypress/screenshots', // Specifies the folder where screenshots will be saved
        // Specify the browser to use; omit or set to `undefined` to use the default browser
        // You can also specify this in the CLI with the `--browser` flag
        browser: 'chrome',
    },
}