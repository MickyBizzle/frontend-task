import { Button, Center, Flex, Heading, Image, Input, VStack } from '@chakra-ui/react'
import { login } from 'api/login';
import { FormFieldWithLabelAndErrors } from 'components/FormFieldWithLabelAndErrors';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { constants } from 'utils/constants';

type LoginFormData = {
  userId: string;
  orgId: string;
}

export const LoginForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async ({ userId, orgId }) => {
    setLoading(true)
    try {
      await login(userId, orgId)
      setCookie(null, 'userId', userId)
      setCookie(null, 'orgId', orgId)
      router.push('/')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Center flex={1}>
      <Flex flexDir="column" bg="gray.200" px={12} py={8} borderRadius={8} textAlign="center" w="70%" shadow="lg">
        <Image src={constants.logo} alt={constants.logoAlt} w={300} />
        <Heading size="md" mt={8} color="gray.500">
          {constants.loginHeading}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDir="column">
            <VStack spacing={4}>
              <FormFieldWithLabelAndErrors htmlFor="userId" label={constants.loginUserLabel} error={errors.userId}>
                <Input {...register("userId", { required: "User ID is required" })} bg="white" borderColor="blue.500" disabled={loading} />
              </FormFieldWithLabelAndErrors>
              <FormFieldWithLabelAndErrors htmlFor="orgId" label={constants.loginOrgLabel} error={errors.orgId}>
                <Input {...register('orgId', { required: 'Organisation ID is required' })} bg="white" borderColor="blue.500" disabled={loading} />
              </FormFieldWithLabelAndErrors>
            </VStack>
            <Button type="submit" bgGradient="linear(to-br, blue.300, blue.700)" _hover={{ bgGradient: "linear(to-br, blue.700, blue.800)" }} w="100%" mt={10} color="white" fontWeight="bold" isLoading={loading}>
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  )
}
