import { createCategoryMap, createUserMap } from "../utils/mapCreators";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";

export const EventItem = ({ data }) => {
  const {
    id,
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
      <Card className="event-detail">
        <CardHeader>
          <Heading textAlign="center">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            By: {typeof createdBy === "number" ? userMap[createdBy] : createdBy}
          </Text>
          <Image src={image} alt={title} />
          <Text>{description}</Text>
          <Text>{location}</Text>
          <Text>
            Start: {startTime} End: {endTime}
          </Text>
          <Text>
            Categories:{" "}
            {categoryIds
              ? categoryIds.map((id) => categoryMap[id]).join(", ")
              : categories}
          </Text>
        </CardBody>
      </Card>
    </Center>
  );
};
