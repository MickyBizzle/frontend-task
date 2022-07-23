import { Select as ChakraSelect, SelectProps, Flex, Spinner } from '@chakra-ui/react'

export const Select = (props: SelectProps & { isLoading: boolean }) =>
  <Flex w="max-content" h="max-content" alignItems="center">
    <ChakraSelect {...props} isDisabled={props.isLoading}>
      {props.children}
    </ChakraSelect>
    {props.isLoading && <Spinner ml={4} />}
  </Flex>