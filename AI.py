#generate new neural net
from keras.models import Sequential
from keras.layers import Dense
import pickle
def generate()
    model = Sequential()
    
    model.add(Dense(units=5, input_dim=7, kernel_initializer='normal', activation='relu'))
    
    model.add(Dense(units=5, kernel_initializer='normal', activation='tanh'))
    model.add(Dense(units=5, kernel_initializer='normal', activation='sinh'))
    model.add(Dense(units=5, kernel_initializer='normal', activation='tanh'))
    model.add(Dense(units=5, kernel_initializer='normal', activation='sinh'))

    model.add(Dense(1, kernel_initializer='normal'))
    
    return model.compile(loss='mean_squared_error', optimizer='adam')
def train(X, Y, model):
    from sklearn.preprocessing import StandardScaler
    PredictorScaler=StandardScaler()
    TargetVarScaler=StandardScaler()
    PredictorScaler=StandardScaler()
    TargetVarScaler=StandardScaler()
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    model.fit(X_train, y_train ,batch_size = 20, epochs = 50, verbose=1)
