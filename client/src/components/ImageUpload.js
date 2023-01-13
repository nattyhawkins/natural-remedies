import axios from 'axios'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'


const ImageUpload = ({ formFields, setFormFields, imageKey, setError }) => {
  const [ imageSelected, setImageSelected ] = useState(false)

  const handleChange = async (event) => {
    try {
      console.log(event)
      if (event.target.files){
        setFormFields({ ...formFields, [imageKey]: '' })
        setImageSelected(true)
      }
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      setFormFields({ ...formFields, [imageKey]: data.secure_url })
    } catch (err) {
      console.log(err.response)
      setError(err.statusText)
      setImageSelected(false)
    }
  }



  return (
    <div className='field'>
      <label>Upload Image</label>
      <br />
      
      <input
        className='upload-input text-center mt-2'
        type='file'
        onChange={handleChange}
      />
      <div className='d-inline-block mt-2 mt-sm-0 ms-md-4'>
        {imageSelected && (!formFields[imageKey] ?
          <>
            <Spinner/> 
            <p className='m-0'> Uploading...</p>
          </>
          :
          <p className='m-0'>✅ Done!</p>
        )}
      </div>
    </div>
  )
}

export default ImageUpload