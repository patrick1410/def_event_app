import { createUserMap } from "../utils/mapCreators";
import { convertDate, capFirstIndex } from "../utils/manipulators";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Image,
  Center,
  Tag,
  Avatar,
  Flex,
  Box,
} from "@chakra-ui/react";

export const EventItem = ({ data }) => {
  const {
    title,
    image,
    description,
    location,
    startTime,
    endTime,
    categories,
    userId,
  } = data.event;

  const { users } = data;

  const userMap = createUserMap(users);

  // Fetch the user data based on userId
  const userData = userMap[userId];

  return (
    <Center>
      <Card maxWidth="600px" className="event-detail">
        <CardHeader>
          <Heading textAlign="center">{title}</Heading>
        </CardHeader>
        <CardBody
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex flexDir="column" alignItems="center">
            <Text>
              <strong>By: </strong>
              {userData.name}
            </Text>
            <Avatar m={3} size="lg" name={userData.name} src={userData.image} />
          </Flex>
          <Image src={image} alt={title} />
          <Box
            w="100%"
            h="100%"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            p={3}
            pb={0}
          >
            <Text>
              <strong>Description: </strong>
              {description}
            </Text>
            <Text>
              <strong>Location: </strong>
              {location}
            </Text>
            <Text>
              <strong>Start: </strong>
              {convertDate(startTime)}
            </Text>
            <Text>
              <strong>End: </strong>
              {convertDate(endTime)}
            </Text>
            <Text>
              <strong>Categories: </strong>
              {categories.map((category, id) => (
                <Tag mr={2} backgroundColor="#bb86fc" color="#fff" key={id}>
                  {capFirstIndex(category.name)}
                </Tag>
              ))}
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Center>
  );
};
