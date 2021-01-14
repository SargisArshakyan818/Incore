import React, {useState} from 'react';
import axios from 'axios';
import Url from '../../../URL';
import '../../main.css';
import {Dropdown,DropdownButton} from "react-bootstrap";
function AdminAddItem (){
    const [selectedFile, setSelectedFile] = useState({});
    const [selectedType, setSelectedType] = useState('All');
    const [soldOut, setSoldOut] = useState(false);

    const addItem = ()=>{
        console.log(selectedType);
        let formData = new FormData();
        formData.append('Name',document.getElementById('name').value);
        formData.append('Description',document.getElementById('description').value);
        formData.append('Usage',document.getElementById('usage').value);
        formData.append('Contraindications',document.getElementById('contraindications').value);
        formData.append('Weight',document.getElementById('weight').value);
        formData.append('Price',document.getElementById('price').value);
        formData.append('SoldOut', soldOut);
        formData.append('Type',selectedType);
        formData.append('file',selectedFile);


        axios.post(Url + 'addItems',formData).then(res=>{
            console.log(res);
            window.location.reload()
        })

    };
    const onChangeHandler= event =>{
        setSelectedFile(event.target.files[0]);
    };
    return (
        <div className='AdminAddItem'>
            <div>
                <label className="custom-file-upload"><input type="file" name="file" className='picUpload'  multiple  onChange={onChangeHandler}/>Upload image</label>
            </div>
            {selectedFile.name ? <div className='Uploaded'>
                Succesfully Uploaded For See please enter save
            </div> :null}


            <div>
                Name: <textarea type="text"  className='Textarea' id='name'/>
            </div>
            <div>
                Description: <textarea type="text"  className='Textarea' id='description'/>
            </div>
            <div>
                Usage: <textarea type="text"  className='Textarea' id='usage'/>
            </div>
            <div>
                Contraindications: <textarea type="text"  className='Textarea' id='contraindications'/>
            </div>
            <div>
                Weight: <textarea type="text" className='Textarea' id='weight'/>

            </div>
            <div>
                Price: <input type="text"  id='price'/>
            </div>
            <div>
                <DropdownButton
                    variant="outline-secondary"
                    title={selectedType}
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item onClick={()=>setSelectedType('Scrubs')}>Scrubs</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setSelectedType('Body')}>Body</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setSelectedType('Face')}>Face</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setSelectedType('Hair')}>Hair</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setSelectedType('Others')}>Other</Dropdown.Item>
                </DropdownButton>
                <p>{selectedType}</p>
            </div>
            <input type="checkbox" onClick={()=>{setSoldOut(!soldOut)}}/>
            <div className='buttons'>
                <div onClick={addItem} className='saveButton'>Add</div>
                <a href="/admin/" className='cancel'>Cancel</a>
            </div>
        </div>
    )
}
export default AdminAddItem;