from google.cloud.firestore import SERVER_TIMESTAMP # Firestore timestamp
from google.oauth2 import service_account
from google.cloud import storage, firestore

# Inisialisasi klien Google Cloud Storage dan Firestore
credentials = service_account.Credentials.from_service_account_file(
    'credential.json'
)

# Inisialisasi klien Google Cloud Storage dan Firestore dengan credentials
storage_client = storage.Client(credentials=credentials)
firestore_client = firestore.Client(credentials=credentials)

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
    data['uploaded_at'] = SERVER_TIMESTAMP  # Menambahkan timestamp otomatis
    doc_ref = firestore_client.collection(collection_name).document(document_id)
    doc_ref.set(data)
    print(f"Document {document_id} saved to Firestore in collection {collection_name}.")

