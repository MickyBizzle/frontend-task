import {
  Flex, Image,
} from "@chakra-ui/react";
import { LoginForm } from "routes/login/LoginForm";
import { constants } from "utils/constants";

const Login = () => {
  return (
    <Flex bg="white" w="100vw" h="100vh">
      <Flex flex={2}>
        <LoginForm />
      </Flex>
      <Flex flex={3}>
        <Image src={constants.loginBackground} alt={constants.loginBackgroundAlt} objectFit="cover" filter="brightness(0.8)" />
      </Flex>
    </Flex>
  );
}

export default Login;