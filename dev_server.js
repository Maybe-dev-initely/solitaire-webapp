/**
 * Basic webserver that sets up two connections:
 *	1.) to the /devbuild directory, for feature development
 *	2.) to the base / directory, for hitting any file in the repo
 *
 * This allows you to specify a port as the first parameter after the name of the application.
 *
 * Default port is 8080 if none is specified.
 *
 * A special port is available for viewing any file in the repository branch source
 */
var connect = require('connect');
var serveStatic = require('serve-static');

// The default port is 8080.
var port = 8080;

if (process.argv[2] !== null) {
	// The user passed in a port argument...
	var parsedPort = parseInt(process.argv[2]);

	if (! isNaN(parsedPort)) { 
		// ...and the argument was a valid number, so set the port to that number.
		port = parsedPort; 
	}
}

// Special port for prototyping ideas that shouldn't be done in the branch source 
// (ie throwaway implementations). This is the "/devbuild" port number + 1.
var baseDirPort = port + 1;

// We serve the "/bin" directory out of the port we determined.
connect().use(serveStatic(__dirname + "/devbuild")).listen(port);

// Lastly we serve the out of the base directory (or any of its
// sub-directories) out of the special port we determined.
connect().use(serveStatic(__dirname)).listen(baseDirPort);