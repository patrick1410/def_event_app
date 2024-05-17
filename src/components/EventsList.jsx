import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  CardHeader,
  CardBody,
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
          <Card key={id} className="event">
            <CardHeader>
              <Link to={`/event/${id}`}>
                <Heading>{title}</Heading>
              </Link>
            </CardHeader>
            <CardBody>
              <Text>{description}</Text>
              <Link to={`/event/${id}`}>
                <Image src={image} alt={title} />
              </Link>
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
    </Box>
  );
};
