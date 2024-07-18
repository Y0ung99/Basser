import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { uploadImage } from '../api/cloudinary';
import useProducts from '../hooks/useProducts';

export default function ProductAdd() {
  const [product, setProducts] = useState({
    img: '', name: '', price: '', category: '', desc: '', options: '',
  });
  const [img, setImg] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const {addProduct} = useProducts();

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'img') {
      setImg(files && files[0]);
      return;
    }
    setProducts(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(img)
    .then(cld => {
      addProduct.mutate(
        {product, cld},
        {
          onSuccess: () => {
            setSuccess('성공적으로 제품이 추가되었습니다.');
            setTimeout(() => {
            setSuccess(null);
            }, 4000)
          }
        }
      )
    })
    .finally(() => setIsUploading(false));
  }

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {success && <p className='my-2'>{success}</p>}
      {img && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(img)} alt={product.name} />}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <Input type={'file'} name={'img'} onChange={handleChange} accept={'image/*'} required
          placeholder={'이미지 파일을 등록해주세요.'}/>
        <Input type={'text'} name={'name'} onChange={handleChange} 
          value={product.name} placeholder={'제품명'} required/>
        <Input type={'text'} name={'price'} onChange={handleChange} 
          value={product.price} placeholder={'가격'} required/>
        <Input type={'text'} name={'category'} onChange={handleChange} 
          value={product.category} placeholder={'카테고리'} required/>
        <Input type={'text'} name={'desc'} onChange={handleChange} 
          value={product.disc} placeholder={'제품설명'} required/>
        <Input type={'text'} name={'options'} onChange={handleChange} 
          value={product.options} placeholder={'옵션 ","로 구분'} required/>
        <Button text={isUploading ? '업로드중...' : '제품 등록하기'}
          type="submit" disabled={isUploading} />
      </form>
    </section>
  );
}

