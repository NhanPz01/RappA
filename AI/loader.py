import tensorflow as tf
import numpy as np
import json

# Load the model and mappings
model = tf.keras.models.load_model("vietnamese_word_classifier.h5")
with open("char_to_int.json", "r") as f:
    char_to_int = json.load(f)
with open("max_word_length.txt", "r") as f:
    max_word_length = int(f.read())


def word_to_seq(word):
    seq = [char_to_int.get(char, 0) for char in word]
    seq += [0] * (max_word_length - len(word))
    return np.array(seq)


def predict_word(word):
    seq = word_to_seq(word.lower())
    seq = np.expand_dims(seq, axis=0)
    prediction = model.predict(seq)[0][0]
    return int(prediction < 0.5) 