import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { EventItem } from "../components/EventItem";
import { EditEvent } from "../components/UI/EditEvent";
import { Box, Stack } from "@chakra-ui/react";
import { DeleteEvent } from "../components/UI/DeleteEvent";
import { deleteEvent } from "../utils/requestHandlers";

export const loader = async ({ params }) => {
  try {
    const events = await fetch(
      `http://localhost:3000/events/?id=${params.eventId}`
    );
    const categories = await fetch("http://localhost:3000/categories");
    const users = await fetch("http://localhost:3000/users");

    return {
      events: await events.json(),
      categories: await categories.json(),
      users: await users.json(),
    };
  } catch (error) {
    console.log(error);
  }
};

export const EventPage = () => {
  const [data, setData] = useState(useLoaderData());

  const id = data.events[0].id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <EventItem data={data} />
      <Stack
        display="flex"
        justifyContent="center"
        direction="row"
        m={10}
        spacing={10}
      >
        <DeleteEvent clickFn={deleteEvent} id={id} />
        <EditEvent data={data} />
      </Stack>
    </Box>
  );
};
