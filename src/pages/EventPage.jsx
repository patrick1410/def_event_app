import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { EventItem } from "../components/EventItem";
import { EditEvent } from "../components/UI/EditEvent";
import { Box, Stack } from "@chakra-ui/react";
import { DeleteEvent } from "../components/UI/DeleteEvent";
import { deleteEvent } from "../utils/requestHandlers";

export const loader = async ({ params }) => {
  try {
    console.log("Fetching event with ID:", params.id); // Log ID
    const event = await fetch(
      `https://event-api-prisma.onrender.com/events/${params.id}`
    );
    const categories = await fetch(
      "https://event-api-prisma.onrender.com/categories"
    );
    const users = await fetch("https://event-api-prisma.onrender.com/users");

    console.log("API response:", { event, categories, users }); // Log API response

    return {
      event: await event.json(),
      categories: await categories.json(),
      users: await users.json(),
    };
  } catch (error) {
    console.log(error);
  }
};

export const EventPage = () => {
  // const [data, setData] = useState(useLoaderData());
  // // const data = useLoaderData();
  // console.dir(data);

  // const id = data.event.id;
  // console.log(id);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const initialData = useLoaderData(); // Haal initiële data op
  const [data, setData] = useState(initialData);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const id = data.event.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://event-api-prisma.onrender.com/events/${data.event.id}`
        );
        const result = await response.json();
        setData((prevData) => ({ ...prevData, event: result }));
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false); // Reset de flag na ophalen van data
    }
  }, [shouldFetchData, id]); // Voeg afhankelijkheden toe

  const handleEventUpdate = () => {
    setShouldFetchData(true); // Zet de flag om gegevens opnieuw op te halen
  };

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
        <EditEvent data={data} onUpdate={handleEventUpdate} />
      </Stack>
    </Box>
  );
};
