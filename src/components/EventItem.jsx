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

  // Haal de gebruikersnaam op basis van userId
  const userName = userMap[userId] || "Unknown User";

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
          <Text>
            <strong>By: </strong>
            {userName}
          </Text>
          <Image src={image} alt={title} />
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
              <Tag backgroundColor="#bb86fc" color="#fff" key={id}>
                {capFirstIndex(category.name)}
              </Tag>
            ))}
          </Text>
        </CardBody>
      </Card>
    </Center>
  );
};
