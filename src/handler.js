const { nanoid } = require('nanoid');
const db = require('./firebaseConfig');

const creates = async (request, h) => {
  const { name, imageUrl } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan image. Mohon isi nama image',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const newImage = { id, name, imageUrl };

  try {
    await db.collection('images').doc(id).set(newImage);
    const response = h.response({
      status: 'success',
      message: 'Image berhasil ditambahkan',
      data: newImage,
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error('Error adding document:', error);
    const response = h.response({
      status: 'error',
      message: 'Image gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

const getAll = async (request, h) => {
  const { name } = request.query;

  try {
    const snapshot = await db.collection('images').get();
    let images = snapshot.docs.map((doc) => doc.data());

    if (name) {
      images = images.filter((image) =>
        image.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    const response = h.response({
      status: 'success',
      data: images,
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error('Error retrieving documents:', error);
    const response = h.response({
      status: 'error',
      message: 'Gagal mengambil data',
    });
    response.code(500);
    return response;
  }
};

const getId = async (request, h) => {
  const { id } = request.params;

  try {
    const doc = await db.collection('images').doc(id).get();
    if (!doc.exists) {
      const response = h.response({
        status: 'fail',
        message: 'Image tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: 'success',
      data: doc.data(),
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error('Error retrieving document:', error);
    const response = h.response({
      status: 'error',
      message: 'Gagal mengambil data',
    });
    response.code(500);
    return response;
  }
};

const deletes = async (request, h) => {
  const { id } = request.params;

  try {
    const doc = await db.collection('images').doc(id).get();
    if (!doc.exists) {
      const response = h.response({
        status: 'fail',
        message: 'Image gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }

    await db.collection('images').doc(id).delete();
    const response = h.response({
      status: 'success',
      message: 'Image berhasil dihapus',
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error('Error deleting document:', error);
    const response = h.response({
      status: 'error',
      message: 'Image gagal dihapus',
    });
    response.code(500);
    return response;
  }
};

module.exports = {
  creates,
  getAll,
  getId,
  deletes,
};
