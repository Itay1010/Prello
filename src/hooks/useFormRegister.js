import { useEffect, useState } from "react"
import { useEffectUpdate } from './useEffectUpdate';

export const useFormRegister = (initialFields, cb) => {

    const [fields, setFields] = useState(initialFields)

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    useEffectUpdate(() => {
        if (cb) cb(fields)
    }, [fields])

    // onChange={handleChange} type="text" id="model" name="model" value={model} 
    const register = (field, type = 'text') => {
        return {
            onChange: handleChange,
            type,
            id: field,
            name: field,
            value: fields[field]
        }
    }

    return [
        register
    ]

}