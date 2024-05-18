import {
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
import { convertDate, capFirstIndex } from "../utils/strManipulator";
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

  if (items.length === 0)
    return (
      <Center as="p" mt={10} color="#F5F5F5">
        No event(s) found...
      </Center>
    );

  return (
    <Center as="div" className="event-list">
      <SimpleGrid
        w="90%"
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
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
              <CardBody
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Link to={`/event/${id}`}>
                  <Image src={image} alt={title} />
                </Link>
                <Text>
                  <em>Description: </em>
                  {description}
                </Text>
                <Text>
                  <em>Start: </em>
                  {convertDate(startTime)}
                </Text>
                <Text>
                  <em>End: </em>
                  {convertDate(endTime)}
                </Text>
                <Text>
                  <em>Categories: </em>
                  {categoryIds
                    ? categoryIds
                        .map((id) => capFirstIndex(categoryMap[id]))
                        .join(", ")
                    : categories}
                </Text>
              </CardBody>
            </Card>
          )
        )}
      </SimpleGrid>
    </Center>
  );
};
