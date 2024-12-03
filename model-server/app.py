from gcs_handler import upload_to_gcs, save_metadata_to_firestore
from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import os

app = Flask(__name__)

# Folder untuk menyimpan file sementara
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model yang telah disimpan
model = tf.keras.models.load_model('./model/braille_model.h5')

# Ukuran input model
img_height, img_width = 64, 64
def preprocess_image(img_path):
    img = Image.open(img_path).convert('L')  # Grayscale
    img = img.resize((img_height, img_width))  # Resize ke (64, 64)
    img_array = np.array(img) / 255.0  # Normalisasi
    img_array = np.expand_dims(img_array, axis=-1)  # Tambahkan dimensi channel
    img_array = np.expand_dims(img_array, axis=0)  # Tambahkan dimensi batch
    return img_array
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    try:
        # Preprocessing gambar
        input_tensor = preprocess_image(file_path)

        # Prediksi menggunakan model
        prediction = model.predict(input_tensor)
        class_index = np.argmax(prediction)
        if 0 <= class_index < 26:  # Pastikan indeks valid untuk alfabet
            predicted_label = chr(97 + class_index)  # Convert index ke huruf
        else:
            predicted_label = "Unknown"

        # Upload gambar ke GCS
        gcs_image_path = f"uploads/{file.filename}"
        gcs_url = upload_to_gcs(file_path, gcs_image_path)

        # Simpan metadata ke Firestore
        metadata = {
            'image_url': gcs_url,
            'prediction': predicted_label,
        }
        save_metadata_to_firestore('predictions', file.filename, metadata)

        # Hapus file sementara
        os.remove(file_path)

        # Kirim hasil prediksi
        return jsonify({'prediction': predicted_label, 'image_url': gcs_url})
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
