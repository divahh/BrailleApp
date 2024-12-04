from google.cloud.firestore import SERVER_TIMESTAMP  # Firestore timestamp
from google.cloud import storage, firestore, secretmanager

# Inisialisasi Secret Manager
SECRET_NAME = "gcs-credentials"
SECRET_VERSION = "latest"
PROJECT_ID = "476849970219"

def get_credentials_from_secret_manager():
    """
    Mengambil kredensial dari Secret Manager.
    """
    try:
        # Inisialisasi klien Secret Manager
        client = secretmanager.SecretManagerServiceClient()
        
        # Format nama secret
        secret_name = f"projects/{PROJECT_ID}/secrets/{SECRET_NAME}/versions/{SECRET_VERSION}"
        
        # Mengakses versi secret
        response = client.access_secret_version(name=secret_name)
        
        # Membaca payload secret
        credentials_json = response.payload.data.decode("UTF-8")
        return service_account.Credentials.from_service_account_info(eval(credentials_json))
    except Exception as e:
        print(f"Error fetching credentials from Secret Manager: {e}")
        raise

# Ambil kredensial dari Secret Manager
credentials = get_credentials_from_secret_manager()

# Inisialisasi klien Google Cloud Storage dan Firestore dengan kredensial
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
    try:
        data['uploaded_at'] = SERVER_TIMESTAMP  # Menambahkan timestamp otomatis
        doc_ref = firestore_client.collection(collection_name).document(document_id)
        doc_ref.set(data)
        print(f"Document {document_id} saved to Firestore in collection {collection_name}.")
    except Exception as e:
        print(f"Error saving document {document_id} to Firestore: {e}")
        raise
