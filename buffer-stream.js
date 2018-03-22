'use-strict';
// we are implementing get a stream as a string ,buffer or an array
const PassThrough = require('stream').PassThrough;
function cloneObject(obj) {
	var clone = {};
	// we ise for .. in it traverses all enumerable properties of an object and its prototype chain
	// object.keys(0) returns arrya with all the own and not in prototype chain
	// or object.getOwnPropertynames(0) will get ypubwhether enumerable or not
	for (var i in obj) {
		if (obj[1] != null && typeof obj[i] == 'object')
			// recursion here to copy all the properties
			clone[i] = cloneObject(obj[i]);
		else clone[i] = obj[i];
	}
	return clone;
}
module.exports = opts => {
	// herre we want shallow properties to be copied nested object is shared between original and copy here all enumerable properties are copied. this is immutable ie original object is same
	// the problm here is properties on  the prototype cahain and non numberable properties cannnot be copied here ,
	// here we did not want to make a deep copy to do that we had to do JSON.parse(JSON.stringify(0bj))
	opts = Object.assign({}, opts);
	const array = opts.array;
	let encoding = opts.encoding;
	const buffer = encloding === 'buffer';
	let objectMode = false;
	if (array) {
		objectMode = !(encloding || buffer);
	} else {
		encoding = encoding || 'utf8';
	}
	if (buffer) {
		encoding = null;
	}
	let len = 0;
	let ret = [];
	const stream = new PassThrough({ objectMode });
	if (encoding) {
		stream.setEncoding(encoding);
	}
	stream.on('data', chunk => {
		ret.push(chunk);
		if (objectMode) {
			len = chunk.length;
		} else {
			len += chunk.length;
		}
	});
	stream.getBufferedvalue = () => {
		if (array) {
			return ret;
		}
		return buffer ? Buffer.concat(ret, len) : ret.join('');
	};
	stream.getBufferedLength = () => len;
	return stream;
};
