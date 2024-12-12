# Braille Recognition

This project provides a REST API for predicting Braille characters from uploaded images. It leverages Google Cloud Storage (GCS) for secure image storage and Firestore for efficient metadata management.

## Key Features

Braille Character Prediction: Upload an image containing a Braille character, and the API will predict the corresponding alphabet letter.
Secure Image Storage in GCS: Images are securely stored in your GCS bucket for future reference.
Efficient Metadata Management in Firestore: Prediction results and image URLs are stored in Firestore for easy retrieval and analysis.
## Getting Started

### Prerequisites

Python 3.x with required libraries (install using pip install google-cloud-storage google-cloud-firestore flask tensorflow Pillow numpy)
A Google Cloud project with enabled Cloud Storage and Firestore APIs.
Service account credentials with appropriate permissions (stored as an environment variable named GCP_CREDENTIALS).
### Configuration

Update GCS_BUCKET_NAME in gcs_handler.py to match your GCS bucket name.
Adjust UPLOAD_FOLDER in app.py to your desired location for temporary image storage (optional).
Ensure your service account credentials file path is set in the GCP_CREDENTIALS environment variable.
### Running the API

Execute python app.py to launch the API server. The default port is 5000.
Use tools like Postman or curl to send prediction requests to the /predict endpoint.
## API Endpoint

**| Field                  | Description                                                   |
|-------------------------|----------------------------------------------------------------|
| URL                   | http://localhost:5000/predict (replace with your server address) |
| Method                 | POST                                                           |
| Request Body          | Form data key: image  <br> Value: A file object containing the Braille image. |
| Response (Success)   | JSON object with fields:  <br> - prediction: Predicted Braille character (e.g., "A", "B"). <br> - image_url: Public URL of the uploaded image in GCS. |
| Response (Error)     | JSON object with field: error: Description of the encountered error. |

## Example Usage (using Postman)

Set the request method to POST.
Set the URL to http://localhost:5000/predict.
In the "Body" tab, select "form-data".
Add a key: image.
Click "Choose File" and select your Braille image.
Send the request.
The response will contain the predicted Braille character and the image URL.
## Deployment (Optional)

For production deployment, consider using a web server like Gunicorn. Update app.run() in app.py to specify the appropriate host and port. Refer to Gunicorn documentation for details.

## Additional Notes

For enhanced security, consider providing read-only access to your GCS bucket using IAM policies.
Implement error handling and validation for the API inputs (e.g., image format checks).
Explore advanced logging and monitoring techniques for production deployments.
