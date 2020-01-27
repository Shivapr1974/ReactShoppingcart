import React from 'react'
import {Rtif} from '../Rtif';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Rating from '@material-ui/lab/Rating';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormInput({label, type, name, value, onChange}) {
    return (
        <>
            <td>
                <FormLabel component="legend">{label}</FormLabel>
            </td>
            <td>
                <Rtif boolean={type === "checkbox"}>
                    <Checkbox
                        name={name}
                        checked={value}
                        onChange={onChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />  
                </Rtif>  
                <Rtif boolean={type === "rating"}>
                    <Rating defaultValue={2.5} precision={0.5} 
                        name={name}
                        onChange={onChange}
                        value={value}                         
                    />
                </Rtif>  

                <Rtif boolean={type === "text" || type === "number"}>
                    <Input inputProps={{ 'aria-label': 'description' }} 
                        name={name}
                        value={value}
                        onChange={onChange}
                        type={type}
                        variant="outlined"
                    />
                </Rtif>  
                <Rtif boolean={type === "textArea"} >
                    <TextField
                        name={name}
                        value={value}
                        onChange={onChange}
                        multiline
                        rows="4"
                        variant="outlined"                
                    />                
                </Rtif>  
            </td>         
        </>
    )
}
