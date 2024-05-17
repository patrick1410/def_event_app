import { createCategoryMap, createUserMap } from "../utils/mapCreators";
import {
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
            <em>By:</em>{" "}
            {typeof createdBy === "number" ? userMap[createdBy] : createdBy}
          </Text>
          <Image src={image} alt={title} />
          <Text>
            <em>Description:</em> {description}
          </Text>
          <Text>
            <em>Location:</em> {location}
          </Text>
          <Text>
            <em>Start:</em> {startTime}
          </Text>
          <Text>
            <em>End:</em> {endTime}
          </Text>
          <Text>
            <em>Categories:</em>{" "}
            {categoryIds
              ? categoryIds.map((id) => categoryMap[id]).join(", ")
              : categories}
          </Text>
        </CardBody>
      </Card>
    </Center>
  );
};
