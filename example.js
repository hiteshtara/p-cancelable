// example.js
const getStdin = require('get-stdin');

getStdin().then(str => {
	console.log(str);
	//=> 'unicorns'
});
// here we  are geting text strema and passing into the function which genetrates  a stream which returns a promise and that resolves when the end event fires on the stream indication that no more data to read 
// getStrrem(strem, [options ])
// here we pass in first parm as the stream and second typ is array
//encoding type string and default is utf8
// getstream,buffer9stream ,[options ] will get thge stream as buffer and 
// getStrema.arrray(stream ,[options])
// gets the stream of array of values 
// streams are essentiall y event emitters  by default streams only support strings and buffers but we are using object mode here with objectMode option on when in objectmode stremas can push string and buffer as well as any javascript object when in object mode the internal buffering algorithm counts objects rather than bytes 
// through2 is a tinay abstration around Node 's cor stream.Transform class that allows you to cretae strems easily
var through2 = require('thorough2')
var split2= require('split2')// this split our input by newlines
var stream = through2({objectMode:true}, ,function(chunk,enc,callback){
    var string = chunk.toString()
    var result = string.replace(/\n/,'').toUpperCase().split(/[\t]/)
    this.push(result)
    callback()

})


stream.on('data', function(data){
    var toString = Object.prototype.toString.call(data)
    console.log('type of data',toString)
    console.log('data',data,'\n')
})
process.stdin.pipe(split()).pipe(stream)
// produces out put type ofdata: [obhect Array]
// data:["hello","world"]
// if an object stream is not emmiting strings or buffers you cannot pipe it to a non object stream 
var throught2 = require('through2')
var objectStream = through2.obj(function(chunk,encoding,callback){
    chink.timestamp = new Date()
    this.push(chunk)
    callback()
})
objectStream.pipe(process.stdout)
objectStream.write({status:404,mesage:'Not found'})
// process.stdout is a regular stream and only deal with string and buffers we need to create another object stream that appropriately transform the data  lets emit json-stringfied versiosn 

var jsonStream = through2.obj(function(chunk ,encoding,callback){
    this.push(JSON.stringify(chunk ,null, 4)+'\n')
    callback()
})
objectMode.pipe(jsonStream).pipe(process.stdout)
// protocol parsers

var net= require('net')
var messageStream = require('irc-message-stream')
net.connect(6667,'irc.freenode.net')
.pipe (messageStream())
.on('data',function(message){
    console.log(JSON.stringify(message,null,4))
    console.log('is server ',message.prefixServer())
})
var fs = require('fs')
var csvPars = require('csv-parse')
fs.createReadStream('data.csv')
.pipe(csvparse({auto_parse:true}))
.on('data',function(record){
    console.log(JSON.stringify(record))
})

// we can chain stream of csv data wigth another Transform stream and convert it into more descriptive ob ject 

var fs = require('fs')
var csvParse = require('csv-parse')
var through2 = require('through2')
fs.createReadStream('data.csv')
.pipe(csvParse({auto_parse:true}))
.pipe(through2.obj(function(chunk ,encoding,callback){
    this.push({
        firstName:chunk[0],
        lastName:chunk[2].split(','),
        id:chunk[3]
    })
    callback()
    .on('data',function(record){
        console.log(JSON.stringify(record,null,4))
    })

}

const fs = require('fs');
const getStream = require('get-stream');
const stream = fs.createReadStream('kuali.txt');
getStream(stream).then(str => {
	console.log(str);
});
