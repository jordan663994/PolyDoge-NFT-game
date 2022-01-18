import requests
def upload_hash(index, data, nonce1, nonce2, nonce3):
    return requests.post("http://127.0.0.1:8083", data = {"index": index, "data": data, "path1":nonce1, "path2":nonce2, "path3": nonce3, "extra": "blah blah blah"})
def download_hash(index, nonce1, nonce2, nonce3):
    return requests.post("http://127.0.0.1:8084", data = {"index": index, "path1":nonce1, "path2":nonce2, "path3": nonce3, "extra": "blah blah blah"}).text
#DO NOT REMOVE '"extra": "blah blah blah blah"', IT IS REQUIRED
import os
import shutil
def _zip(path):
    d = os.getcwd()
    print("zipping...")
    shutil.make_archive("C:/interface_server/cache/temp", "zip", path)
    print("done")
def upload(path):
    _zip(path)
    return requests.get("http://127.0.0.1:1010").text
def download(hash):
    requests.post("http://127.0.0.1:101", data = {"d": hash, "e": e()}).text
