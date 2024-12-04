const { nanoid } = require('nanoid');
const images = require('./images');

const creates = (request, h) => {
  const {
    name, imageLogo,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan image. Mohon isi nama image',
    });

    response.code(400);

    return response;
  }

  const id = nanoid(16);
  const newImage = {
    id, name, imageLogo,
  };

  images.push(newImage);

  const isSuccess = images.filter((image) => image.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Image berhasil ditambahkan',
      data: {
        imageId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Image gagal ditambahkan',
  });
  response.code(200);
  return response;
};

const getAll = (request, h) => {
  const { name } = request.query;

  let filteredImages = images;

  // Filter berdasarkan nama jika query `name` diberikan
  if (name !== undefined) {
    filteredImages = filteredImages.filter((image) =>
      image.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Jika hanya satu data ditemukan, kembalikan sebagai objek tunggal
  if (filteredImages.length === 1) {
    const [image] = filteredImages;
    const response = h.response({
      status: 'success',
      data: {
        id: image.id,
        name: image.name,
        imageLogo: image.imageLogo,
      },
    });
    response.code(200);
    return response;
  }

  // Jika lebih dari satu atau tidak ada data, kembalikan semua dalam array
  const response = h.response({
    status: 'success',
    data: filteredImages.map((image) => ({
      id: image.id,
      name: image.name,
      imageLogo: image.imageLogo,
    })),
  });

  response.code(200);
  return response;
};



const getId = (request, h) => {
  const { id } = request.params;
  const image = images.find((i) => i.id === id);

  if (image !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        id: image.id,
        name: image.name,
        imageLogo: image.imageLogo,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Image tidak ditemukan',
  });

  return response.code(404);
};



// const editImageByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const {
//     name, year, author, summary, publisher, pageCount, readPage, reading,
//   } = request.payload;

//   const updatedAt = new Date().toISOString();
//   const index = images.findIndex((image) => image.id === id);

//   if (index !== -1) {
//     if (name === undefined) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal memperbarui image. Mohon isi nama image',
//       });
//       return response.code(400);
//     }

//     if (pageCount < readPage) {
//       const response = h.response({
//         status: 'fail',
//         message: 'Gagal memperbarui image. readPage tidak boleh lebih besar dari pageCount',
//       });

//       return response.code(400);
//     }

//     const finished = (pageCount === readPage);

//     images[index] = {
//       ...images[index],
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       finished,
//       reading,
//       updatedAt,
//     };

//     const response = h.response({
//       status: 'success',
//       message: 'Image berhasil diperbarui',
//     });

//     return response.code(200);
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Gagal memperbarui image. Id tidak ditemukan',
//   });

//   return response.code(404);
// };

const deletes = (request, h) => {
  const { id } = request.params;

  const index = images.findIndex((image) => image.id === id);

  if (index !== -1) {
    images.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Image berhasil dihapus',
    });

    return response.code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Image gagal dihapus. Id tidak ditemukan',
  });

  return response.code(404);
};

module.exports = {
  creates,
  getAll,
  getId,
  deletes,
};
