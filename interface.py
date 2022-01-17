import requests
def upload(index, data, nonce1, nonce2, nonce3):
    return requests.post("http://127.0.0.1:8083", data = {"index": index, "data": data, "path1":nonce1, "path2":nonce2, "path3": nonce3, "extra": "blah blah blah"})
def download(index, nonce1, nonce2, nonce3):
    return requests.post("http://127.0.0.1:8084", data = {"index": index, "path1":nonce1, "path2":nonce2, "path3": nonce3, "extra": "blah blah blah"}).text
#DO NOT REMOVE '"extra": "blah blah blah blah"', IT IS REQUIRED
