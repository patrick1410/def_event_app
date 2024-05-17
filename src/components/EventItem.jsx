import { createCategoryMap, createUserMap } from "../utils/mapCreators";
import { deleteEvent } from "../utils/requestHandlers";
import { Button } from "@chakra-ui/react";

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
    <>
      <div className="event-detail">
        <h1>{title}</h1>
        <p>
          By: {typeof createdBy === "number" ? userMap[createdBy] : createdBy}
        </p>
        <img src={image} alt={title} />
        <p>{description}</p>
        <p>{location}</p>
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
      <Button onClick={() => deleteEvent(id)}>Delete</Button>
    </>
  );
};
