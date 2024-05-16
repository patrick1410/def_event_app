import { Link } from "react-router-dom";
import { createCategoryMap } from "./utils/mapCreators";
import { matchSorter } from "match-sorter";
import { Spinner } from "@chakra-ui/react";

export const EventsList = ({
  data,
  filteredEvents,
  searchField,
  sortBy,
  isLoading,
}) => {
  const { events, categories } = data;

  const categoryMap = createCategoryMap(categories);

  const sortedEvents = matchSorter(events, sortBy, {
    keys: ["categoryIds"],
  });

  let items;

  items = events;

  if (sortBy) items = sortedEvents;
  if (searchField) items = filteredEvents;

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (items.length === 0) return <p>No events found..</p>;

  return (
    <div className="event-list">
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
          <div key={id} className="event">
            <Link to={`/event/${id}`}>
              <h2>{title}</h2>
            </Link>
            <p>{description}</p>
            <Link to={`/event/${id}`}>
              <img src={image} alt={title} />
            </Link>
            <p>
              Start: {startTime} End: {endTime}
            </p>
            <p>
              Categories:{" "}
              {categoryIds
                ? categoryIds.map((id) => categoryMap[id]).join(", ")
                : categories}
            </p>
          </div>
        )
      )}
    </div>
  );
};
