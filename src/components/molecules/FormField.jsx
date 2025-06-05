import React from 'react'
import Label from '../atoms/Label'
import Input from '../atoms/Input'
import TextArea from '../atoms/TextArea'
import Select from '../atoms/Select'

export default function FormField({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  className = '',
  options = [], // For select type
  rows = 3,     // For textarea type
  ...props
}) {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <TextArea
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            {...props}
          />
        )
      case 'select':
        return (
          <Select
            id={name}
            value={value}
            onChange={onChange}
            options={options}
            {...props}
          />
        )
      default:
        return (
          <Input
            type={type}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...props}
          />
        )
    }
  }

  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>{label}</Label>
      {renderInput()}
    </div>
  )
}