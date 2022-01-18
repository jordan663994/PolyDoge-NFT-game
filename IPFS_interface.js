const { create, urlSource } = require('ipfs-core')
const { pipe } = require('it-pipe')
const { extract } = require('it-tar')
const http = require("http")
const fs = require('fs')
const all = require('it-all')
const toBuffer = require('it-to-buffer')
const map = require('it-map')
function parse_body(body) {
	var out = []
	var j = ""
	var i = 0

	while (i <= body.length){
		if (body[i] == "&") {
			out.push(j)
			j = ""
			i += 1
		}
		if (body[i] == "%") {
			out.push(j)
			j = ""
			i += 1
		}
		else {
			j += body[i]
			i += 1
		}
	}
	out2 = []
	console.log(out)
	for (var i = 0; i < out.length; i++) {
		var s = out[i]
		console.log(s)
		out2.push(s.split("=")[1])
	}
	return out2
}
function get_first(inp) {
  var out = inp[0]
}
const globSourceOptions = {
  recursive: true
};
var nonce = 0
async function main() {
  console.log("working...")
  const ipfs = await create()
  console.log("ready")
  http.createServer(async function(req, res) {
    console.log("recieved")
  	res.writeHead(200)
  	body = ""
  	console.log("recieved")
  	req.on('data', chunk => {
  		body += chunk.toString()
  		console.log(body)

  	})
  	req.on('end', async () => {
			var content_ = fs.createReadStream("./cache/temp.zip")
  		var out = await ipfs.add({path: "test.zip", content: content_})
			out = out['cid'].toString()
  		res.write(out)
  		res.end()
  	})
  }).listen(1010)
  http.createServer(async function(req, res) {
    console.log("recieved")
  	res.writeHead(200)
  	body = ""
  	console.log("recieved")
  	req.on('data', chunk => {
  		body += chunk.toString()
  		console.log(body)

  	})
  	req.on('end', async () => {
  		var out = parse_body(body)
			async function * tarballed (source) {
	      yield * pipe(
	        source,
	        extract(),
	        async function * (source) {
	          for await (const entry of source) {
	            yield {
	              ...entry,
	              body: await toBuffer(map(entry.body, (buf) => buf.slice()))
	            }
	          }
	        }
	      )
	    }
			async function collect (source) {
	      return all(source)
	    }
			output = await pipe(
				ipfs.get(out[0], {archive: true}),
				tarballed,
        collect
			)
			fs.writeFile("./cache/test.zip", output[0].body, function(err) {
				if (err) {
					console.log(err)
				}
			})
			res.write("success! :)")
  		res.end()
  	})
  }).listen(101)
  console.log("servers created")
}
main()
