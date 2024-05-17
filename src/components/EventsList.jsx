import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  CardHeader,
  CardBody,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { createCategoryMap } from "../utils/mapCreators";
import { matchSorter } from "match-sorter";

export const EventsList = ({ data, filteredEvents, searchField, sortBy }) => {
  const { events, categories } = data;

  const categoryMap = createCategoryMap(categories);

  const sortedEvents = matchSorter(events, sortBy, {
    keys: ["categoryIds"],
  });

  let items;

  items = events;

  if (sortBy) items = sortedEvents;
  if (searchField) items = filteredEvents;

  if (items.length === 0) return <p>No events found..</p>;

  return (
    <Box className="event-list">
      <Center>
        <SimpleGrid
          w="90%"
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={8}
          mt={10}
          mb={10}
        >
          {items.map(
            ({
              id,
              title,
              description,
              image,
              startTime,
              endTime,
              categoryIds,
            }) => (
              <Card
                key={id}
                className="event"
                _hover={{ transform: "scale(1.05)" }}
              >
                <CardHeader>
                  <Link to={`/event/${id}`}>
                    <Heading textAlign="center">{title}</Heading>
                  </Link>
                </CardHeader>
                <CardBody>
                  <Link to={`/event/${id}`}>
                    <Image src={image} alt={title} />
                  </Link>{" "}
                  <Text>{description}</Text>
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
            )
          )}
        </SimpleGrid>
      </Center>
    </Box>
  );
};
