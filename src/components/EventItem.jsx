import { createCategoryMap, createUserMap } from "../utils/mapCreators";
import { convertDate, capFirstIndex } from "../utils/strManipulator";
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
    categoryIds,
    createdBy,
  } = data.events[0];

  const { categories, users } = data;

  const categoryMap = createCategoryMap(categories);
  const userMap = createUserMap(users);

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
            {typeof createdBy === "number" ? userMap[createdBy] : createdBy}
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
            {categoryIds.map((id) => (
              <Tag backgroundColor="#bb86fc" color="#fff" key={id}>
                {capFirstIndex(categoryMap[id])}
              </Tag>
            ))}
          </Text>
        </CardBody>
      </Card>
    </Center>
  );
};
