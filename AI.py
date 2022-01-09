#generate new neural net
from keras.models import Sequential
from keras.layers import Dense
import pickle
import requests
import json

def blockchain_cacher(data, nonce):
    response = requests.post("http://127.0.0.1:8083", data = {"index": 0, "data": data, "path1":nonce, "path2":nonce})

url = requests.get('https://github.com/google-research-datasets/ccpe/raw/main/data.json')
text = url.text
data = json.loads(text)
da = data[0]

encounterred_words = []

def generate():
    model = Sequential()
    
    model.add(Dense(units=5, input_dim=7, kernel_initializer='normal', activation='relu'))
    
    model.add(Dense(units=5, kernel_initializer='normal', activation='tanh'))
    model.add(Dense(units=5, kernel_initializer='normal', activation='tanh'))

    model.add(Dense(1, kernel_initializer='normal'))
    
    return model.compile(loss='mean_squared_error', optimizer='adam')
def train(X, Y, model):
    from sklearn.preprocessing import StandardScaler
    PredictorScaler=StandardScaler()
    TargetVarScaler=StandardScaler()
    PredictorScaler=StandardScaler()
    TargetVarScaler=StandardScaler()
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=42)
    model.fit(X_train, y_train ,batch_size = 20, epochs = 50, verbose=1)
    return model
def parseDictArr(da, speakers):
    x = []
    y = []
    z = []
    for i in da['utterances']:
        if i["speaker"] == speakers[0]:
            x.append(i['text'])
        elif i["speaker"] == speakers[1]:
            y.append(i['text'])
        z.append(i["text"])
    for i in z:
        a = ""
        for j in i:
            if j == " ":
                encounterred_words.append(a)
                a = ""
            a += j
    return x, y
x, y = parseDictArr(da, ["ASSISTANT", "USER"])
def parse_sentence(sentence):
    j = ""
    words = []
    for i in sentence:
        if i == " ":
            words.append(j)
            j = ""
        else:
            j += i
    words.append(j)
    return words
def convert_to_int(word):
    for i in range(len(encounterred_words)):
        if word == encounterred_words[i]:
            return i
models = []
X = []
for i in x:
    a = []
    for j in parse_sentence(i):
        a.append(convert_to_int(j))
    X.append(a)
Y = []
for i in y:
    a = []
    for j in parse_sentence(i):
        a.append(convert_to_int(j))
    Y.append(a)
for i in range(len(X)):
    while len(X[i]) <= 100:
        X[i].append(0)
    while len(y[i]) <= 100:
        Y[i].append(0)
    f = open("cache.pkl", "w")
    p = pickle.Pickler(f)
    p.dump(train(X[i], Y[i], generate()))
    f.close()
    f2 = open("cache.pkl", "r")
    d = f2.read()
    blockchain_cacher(d, i)
    f2.close()
    
    
