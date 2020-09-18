import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {axiosWithAuth} from '../utils/axiosWithAuth'


const initialValue = {
    color:'',
    code: {
        hex:''
    },
    id: ''
}

const AddColor = () => {
    const [addColor, setAddColor] = useState(initialValue)

    const history = useHistory()

    

    const onSubmit = e => {
        e.preventDefault();
        const newColor = {
            color: addColor.color.trim(),
            code: {
                hex:addColor.code.hex.trim()
            },
            id: addColor.id  
        }
        axiosWithAuth().post('/api/colors',newColor)
        .then(res =>{history.push('/bubble')})
        .catch(err => console.log(err))
    }
    return (
        <div>
        <h2>Add Color</h2>
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="color"
                onChange={e => setAddColor({ ...addColor, color: e.target.value })}
                placeholder="color"
                value={addColor.color}
            />
            <input
                type="code"
                name="hex"
                onChange={e => setAddColor({
                    ...addColor,
                    code: { hex: e.target.value }
                  })}
                placeholder="hex"
                value={addColor.code.hex}
            />
            <button>Submit</button>
        </form>
    </div>
    )
}

export default AddColor;