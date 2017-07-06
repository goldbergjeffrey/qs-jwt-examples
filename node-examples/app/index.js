/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = "/jwt/"; //change virtual proxy prefix if different than jwt.
var config = {
    host: "Enter Qlik Sense host name here",
    prefix: prefix,
    port: 443,
    isSecure: true
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function(qlik) {
    qlik.setOnError(function(error) {
        $('#popupText').append(error.message + "<br>");
        $('#popup').fadeIn(1000);
    });
    $("#closePopup").click(function() {
        $('#popup').hide();
    });

    //callbacks -- inserted here --
    //open apps -- inserted here --
    var app = qlik.openApp('07daff51-8263-4833-b0fd-31ad85fdb2a0', config);

    //get objects -- inserted here --
    app.getObject('QV05', 'qamd');
    app.getObject('QV02', 'akDGX');
    app.getObject('QV04', 'nPLRub');
    app.getObject('QV01', 'Ydsxt');
    //create cubes and lists -- inserted here --

});