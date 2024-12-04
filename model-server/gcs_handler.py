from google.cloud import storage, firestore
from google.oauth2 import service_account
from google.cloud.firestore import SERVER_TIMESTAMP  # Firestore timestamp
import os
import json

# Mengambil kredensial dari variabel lingkungan
def get_credentials_from_env_var():
    try:
        # Ambil isi secret dari variabel lingkungan
        credentials_json = os.getenv("gcp-credentials")
        if not credentials_json:
            raise ValueError("GCP_CREDENTIALS environment variable not set or empty.")
        
        # Parse JSON ke dalam format yang sesuai
        credentials_info = json.loads(credentials_json)
        return service_account.Credentials.from_service_account_info(credentials_info)
    except Exception as e:
        print(f"Error fetching credentials: {e}")
        raise

# Ambil kredensial dari Secret Manager melalui variabel lingkungan
credentials = get_credentials_from_env_var()

# Inisialisasi klien Google Cloud Storage dan Firestore dengan kredensial
storage_client = storage.Client(credentials=credentials)
firestore_client = firestore.Client(credentials=credentials)

# Konfigurasi bucket GCS
GCS_BUCKET_NAME = 'modelbraille'

# Fungsi untuk mengunggah file ke GCS
def upload_to_gcs(local_path, gcs_path):
    try:
        # Akses bucket menggunakan nama bucket
        bucket = storage_client.bucket(GCS_BUCKET_NAME)
        blob = bucket.blob(gcs_path)
        blob.upload_from_filename(local_path)
        print(f"File {local_path} uploaded to {gcs_path}.")
        return blob.public_url
    except Exception as e:
        print(f"Error uploading {local_path} to GCS: {e}")
        raise

# Fungsi untuk menyimpan metadata ke Firestore
def save_metadata_to_firestore(collection_name, document_id, data):
    try:
        data['uploaded_at'] = SERVER_TIMESTAMP  # Menambahkan timestamp otomatis
        doc_ref = firestore_client.collection(collection_name).document(document_id)
        doc_ref.set(data)
        print(f"Document {document_id} saved to Firestore in collection {collection_name}.")
    except Exception as e:
        print(f"Error saving document {document_id} to Firestore: {e}")
        raise
