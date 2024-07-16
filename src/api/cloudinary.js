const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

  return fetch(url, {
    method: 'POST',
    body: formData,
  })
  .then(res => {
    return res.text();
  })
  .then(text => JSON.parse(text));
}