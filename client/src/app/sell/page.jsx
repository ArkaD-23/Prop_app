'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.js'

const sell = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    Price: 50,
    offer: false,
    parking: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => { }
  const storeImage = async () => { }
  const handleRemoveImage = () => { }
  const handleChange = (e) => { };
  const handleSubmit = (e) => { };

  return (
    <main style={{ padding: '12px', maxWidth: '1024px', margin: '150px auto' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: '600', textAlign: 'center', margin: '28px 0' }}>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: '1' }}>
          <input
            type='text'
            placeholder='Name'
            style={{
              fontFamily: 'Roboto',
              outline: '0',
              background: '#f2f2f2',
              width: '100%',
              border: '0',
              margin: '0 0 15px',
              padding: '15px',
              boxSizing: 'border-box',
              fontSize: '14px',
              borderRadius: '50px'
            }}
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            style={{
              fontFamily: 'Roboto',
              outline: '0',
              background: '#f2f2f2',
              width: '100%',
              border: '0',
              margin: '0 0 15px',
              padding: '15px',
              boxSizing: 'border-box',
              fontSize: '14px',
              borderRadius: '50px'
            }}
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            style={{
              fontFamily: 'Roboto',
              outline: '0',
              background: '#f2f2f2',
              width: '100%',
              border: '0',
              margin: '0 0 15px',
              padding: '15px',
              boxSizing: 'border-box',
              fontSize: '14px',
              borderRadius: '50px'
            }}
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type='checkbox'
                id='parking'
                style={{ width: '20px' }}
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type='checkbox'
                id='offer'
                style={{ width: '20px' }}
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                style={{ padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Bedrooms</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                style={{ padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bathrooms</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                style={{ padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                onChange={handleChange}
                value={formData.Price}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>Price</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1', gap: '16px' }}>
          <p style={{ fontWeight: '600' }}>
            Images:
            <span style={{ fontWeight: '400', color: '#718096', marginLeft: '8px' }}>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input
              onChange={(e) => setFiles(e.target.files)}
              style={{ padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px', width: '100%' }}
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              style={{
                padding: '12px',
                color: '#2F855A',
                border: '1px solid #2F855A',
                borderRadius: '8px',
                textTransform: 'uppercase',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? '0.8' : '1',
                boxShadow: uploading ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p style={{ color: '#C53030', fontSize: '14px' }}>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px',
                  border: '1px solid #E2E8F0',
                  alignItems: 'center',
                }}
              >
                <img
                  src={url}
                  alt='listing image'
                  style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '8px' }}
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    padding: '12px',
                    color: '#C53030',
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    opacity: '1',
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            style={{
              fontFamily: '"Roboto", sans-serif',
                textTransform: 'uppercase',
                outline: '0',
                background: 'green',
                width: '100%',
                border: '0',
                padding: '15px',
                color: '#FFFFFF',
                fontSize: '14px',
                WebkitTransition: 'all 0.3s ease',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                borderRadius:'50px'
            }}
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p style={{ color: '#C53030', fontSize: '14px' }}>{error}</p>}
        </div>

      </form>
    </main>

  )
}

export default sell