import { Avatar, Flex, Text, VStack } from "@chakra-ui/react";

const PostHeader = ({ avatar, username }) => {
  return (
    <>
      <Flex justify={"space-between"} align={"center"} w={"100%"} p={4}>
        <Flex align={"center"} gap={2}>
          <Avatar src={avatar} alt={"profpic"} size={"sm"} />
          <VStack fontSize={12}>
            <Flex flexDirection={"column"} justify={"left"}>
              <Text fontSize={12} fontWeight={700} color={"#FFF"}>
                {username}
              </Text>
              <Flex gap={2} fontSize={10} fontWeight={400} color={"#FFF"}>
                <Text>Just Now</Text>
                <Text>|</Text>
                <Text>Location</Text>
              </Flex>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default PostHeader;
