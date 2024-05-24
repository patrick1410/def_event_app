import {
  Heading,
  Text,
  Image,
  Card,
  CardHeader,
  CardBody,
  Center,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { createCategoryMap } from "../utils/mapCreators";
import { convertDate, capFirstIndex } from "../utils/manipulators";
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
                  <strong>Description: </strong>
                  {description}
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
          )
        )}
      </SimpleGrid>
    </Center>
  );
};
