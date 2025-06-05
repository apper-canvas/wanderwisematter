import ApperIcon from '../ApperIcon'

export default function Icon({ name, className = '', ...props }) {
  return (
    <ApperIcon name={name} className={className} {...props} />
  )
}