
import React, {useState} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import  ClassicEditor  from "@ckeditor/ckeditor5-build-classic";
// import parse from 'react-html-parser';
// import '../App.css'

function Editor1 () {
    const [addData, setVal] = useState("");
    const handleChange = (e, editor) => {
        const data = editor.getData();
        setVal(data);
        console.log(data);
    }

    return(
        <div className="App">
            <h2>Add Form</h2>
            <div style={{width: "700px", display: "inline-block", textAlign:"left"}}>
            <div style={{width: "700px", display: "inline-block", textAlign:"right", marginBottom:"left"}}>
                
            </div>
            <label>Description</label>
            <CKEditor editor={ClassicEditor} data={addData} onChange={handleChange} />
            </div>
     
        {/* <div>{addData}</div> */}
        <div dangerouslySetInnerHTML={{ __html: addData}}  />
              
        </div>
    )
}

export default Editor1;









