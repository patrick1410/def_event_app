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
import { convertDate, capFirstIndex } from "../utils/manipulators";
import { matchSorter } from "match-sorter";

export const EventsList = ({ data, filteredEvents, searchField, sortBy }) => {
  const { events } = data;

  // This function takes events as an input and returns them with a new property "categoryIds" so it is easily to sort
  const formatEvents = (events) => {
    return events.map((event) => {
      // Return original event + categoryId(s)
      return {
        ...event,
        categoryIds: event.categories.map((category) => category.id),
      };
    });
  };

  const formattedEvents = formatEvents(events);

  const sortedEvents = matchSorter(formattedEvents, sortBy, {
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
            categories,
          }) => (
            <Card
              key={id}
              className="event"
              _hover={{ transform: "scale(1.05)" }}
            >
              <CardHeader>
                <Link to={`/events/${id}`}>
                  <Heading textAlign="center">{title}</Heading>
                </Link>
              </CardHeader>
              <CardBody
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Link to={`/events/${id}`}>
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
                  {categories.map((category, id) => (
                    <Tag mr={2} backgroundColor="#bb86fc" color="#fff" key={id}>
                      {capFirstIndex(category.name)}
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
