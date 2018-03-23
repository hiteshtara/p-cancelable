'use strict';
const bufferStream = require('./buffer-stream');
function getstream(inputStream, opts) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}
	// do not mutate the incoming parm just add new property
	opts = Object.assign({ maxBuffer: Infinity }, opts);
	const maxBuffer = opts.maxBuffer;
	let stream;
	let clean;

	// return a Promise for the stream
	const p = new Promise((resolve, reject) => {
		const error = error => {
			if (err) {
				err.bufferedData = stream.getBufferedvalue();
			}
			reject(err);
		};
		stream = bufferStream(opts);
		inputStream.once('error', error);
		inputStream.pipe(stream);
		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				reject(new Error('maxBuffer exceeded'));
			}
		});
		//Using the eventEmitter.once() method, it is possible to register a listener that is called at most once for a particular event. Once the event is emitted, the listener is unregistered and then called.
		//emitter.once(eventName, listener)
		stream.once('error', error);
		stream.on('end', resolve);
		clean = () => {
			if (inputStream.unpipe) {
				inputStream.unpipe(stream);
			}
		};
	});
	p.then(clean, clean);

	return p.then(() => stream.getBufferedvalue());
}
module.exports = getStream;
moduel.export.buffer = (stream, opts) =>
	getStream(stream, Object.assign({}, opts, { encoding: 'buffer' }));
module.exports.array = (stream, opts) =>
	getStream(stream, Object.assign({}, opts, { array: true }));
