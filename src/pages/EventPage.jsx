import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { EventItem } from "../components/EventItem";
import { EditEvent } from "../components/UI/EditEvent";
import { Box, Stack } from "@chakra-ui/react";
import { DeleteEvent } from "../components/UI/DeleteEvent";
import { deleteEvent } from "../utils/requestHandlers";

import { LoadingComponent } from "../components/UI/loadingComponent";
import { ErrorComponent } from "../components/UI/errorComponent";

export const loader = async ({ params }) => {
  try {
    const event = await fetch(
      `https://event-api-prisma.onrender.com/events/${params.id}`
    );
    const categories = await fetch(
      "https://event-api-prisma.onrender.com/categories"
    );
    const users = await fetch("https://event-api-prisma.onrender.com/users");

    return {
      event: await event.json(),
      categories: await categories.json(),
      users: await users.json(),
    };
  } catch (error) {
    console.error(error);
  }
};

export const EventPage = () => {
  const initialData = useLoaderData(); // Haal initiële data op

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [shouldFetchData, setShouldFetchData] = useState(false);

  const id = data.event.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://event-api-prisma.onrender.com/events/${data.event.id}`
        );
        const result = await response.json();
        setData((prevData) => ({ ...prevData, event: result }));
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false); // Reset flag after fetchData()
    }
  }, [shouldFetchData, id]);

  // Function for EditEvent component to set flag to true again after updating
  const handleEventUpdate = () => {
    setShouldFetchData(true);
  };

  return error ? (
    <ErrorComponent error={error} color="#B22222" />
  ) : isLoading ? (
    <LoadingComponent />
  ) : (
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
        <EditEvent data={data} onUpdate={handleEventUpdate} />
      </Stack>
    </Box>
  );
};
