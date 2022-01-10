#generate new neural net
from keras.models import Sequential
from keras.layers import Dense
import pickle
import json
import numpy as np
from os import path
import requests
def remove_2_chars(a):
    for i in range(len(a)):
        j = list(a[i])
        k = []
        for p in j:
            k.append(p)
        l = ""
        j.pop()
        for x in j:
            l += x
        a[i] = l
    return a
def generate():
        print("generating...")
        model = Sequential()
        model.add(Dense(units=5, input_dim=2, kernel_initializer='normal', activation='relu'))
        model.add(Dense(units=5, kernel_initializer='normal', activation='tanh'))

        model.add(Dense(1, kernel_initializer='normal'))
        model.compile(loss='mean_squared_error', optimizer='adam')
        return model
def main(w):
    m = generate()
    for da in data:
        f = open("words.txt", "r")
        a = f.readlines()
        encounterred_words = remove_2_chars(a)
        f.close()
        m.set_weights(w)
        def train(X, Y, model):
            print("generated")
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
                    else:
                        a += j
                encounterred_words.append(a)
            return x, y
        x, y = parseDictArr(da, ["JORDAN", "YOU"])
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
            while len(X[i]) <= 30:
                X[i].append(0)
            while len(Y[i]) <= 30:
                Y[i].append(0)
            counter = 0
            _X_ = []
            k = []
            for j in X[i]:
                if counter >= 2:
                    _X_.append(k)
                    counter = 0
                    k = []
                else:
                    counter += 1
                    k.append(j)
            counter = 0
            _Y_ = []
            k = []
            for j in Y[i]:
                if counter >= 2:
                    _Y_.append(k)
                    counter = 0
                    k = []
                else:
                    counter += 1
                    k.append(j)
            m = train(_X_, _Y_, m)
        f = open("words.txt", "w")
        f.writelines(encounterred_words)
        f.close()
    return m.get_weights()
i = 0
running = True
wei = []
url = requests.get(input("enter the data URL"))
text = url.text
data = json.loads(text)
while running:
    if path.exists("weights" + str(i) + ".txt"):
        wei.append(np.loadtxt("weights" + str(i) + ".txt", "%.18e"))
        i += 1
    else:
        running = False
if len(wei) != 6:
    wei = generate().get_weights()
res = main(wei)
for i in range(len(res)):
    np.savetxt("weights" + str(i) + ".txt", res[i])
