import {
  FormErrorMessage,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'

export const FormFieldWithLabelAndErrors = ({ children, label, error, htmlFor }) => {
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={htmlFor} fontWeight="bold">
        {label}
      </FormLabel>
      {children}
      {error && <FormErrorMessage>
        {error.message}
      </FormErrorMessage>}
    </FormControl>
  )
}
