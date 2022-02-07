import React, {useState} from 'react';




function UploadFile() {



    const [selectedImage, setSelectedImage] = useState( );

const imageChange=(e)=>{

        if(e.target.files && e.target.files.length > 0){
          console.log("image link", e.target.files[0]);
            setSelectedImage(e.target.files[0]);
            
        }
       
}
// console.log(URL.createObjectURL(selectedImage))
  return (
<div>
        
         <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                        <input accept='image/*' onChange={imageChange}  type="file"  />
  
  {selectedImage&&(
                        <div>       <img src= { URL.createObjectURL(selectedImage)} alt='thump'/>
                       
         </div>
       )  }
         
        
         
         </div>
  
  )
}

export default UploadFile;
