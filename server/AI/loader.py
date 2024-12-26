from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import json
from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)

# Enable CORS for all routes (most common and simplest)
CORS(app) 
# Load the saved model
model = tf.keras.models.load_model(r"D:\01_Projects\1-tech\pbl6_rappa\server\AI\vietnamese_word_classifier.h5")

with open(r"D:\01_Projects\1-tech\pbl6_rappa\server\AI\model_data.json", 'r') as f:
    loaded_data = json.load(f)
all_chars = loaded_data['all_chars']
char_to_int = dict((c, i) for i, c in enumerate(all_chars))
max_word_length = loaded_data['max_word_length']

def word_to_seq(word):
    seq = [char_to_int.get(char, 0) for char in word]
    seq += [0] * (max_word_length - len(word))
    return np.array(seq)

def word_to_seq(word):
    seq = [char_to_int.get(char, 0) for char in word]
    seq += [0] * (max_word_length - len(word))
    return np.array(seq)


def predict_word(word):
    seq = word_to_seq(word.lower())  # Ensure lowercase here
    seq = np.expand_dims(seq, axis=0)
    prediction = model.predict(seq)[0][0]
    if prediction > 0.85:
        return True, prediction
    else:
        return False, prediction


@app.route('/predict', methods=['POST'])
def predict_api():
    data = request.get_json()
    word = data.get('word')
    if not word:
        return jsonify({'error': 'No word provided'}), 400

    language, probability = predict_word(word)
    return jsonify({'language': language, 'probability': float(probability)})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)