import { convertToLocal } from "./manipulators";
import { getJWT } from "./getJWT";

// deleteEvent functie
export const deleteEvent = async (id) => {
  try {
    if (confirm("Are you sure you want to delete the event?")) {
      console.log("Deleting event with ID:", id);

      const token = getJWT();
      const response = await fetch(
        `https://event-api-prisma.onrender.com/events/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        }
      );

      console.log("Response status:", response.statusText);

      if (response.ok) {
        console.log("Event successfully deleted");
        window.history.back();
      }
    }
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

// editEvent functie
export const editEvent = async (id, event, onClose, toast, onUpdate) => {
  try {
    console.log("Editing event with ID:", id);
    const token = getJWT();
    const response = await fetch(
      `https://event-api-prisma.onrender.com/events/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          createdBy: event.createdBy,
          title: event.title,
          description: event.description,
          image: event.image,
          categoryIds: event.categoryIds.map((id) => id.toString()),
          location: event.location,
          startTime: convertToLocal(event.startTime),
          endTime: convertToLocal(event.endTime),
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `${token}`,
        },
      }
    );

    console.log(response.body);

    if (response.ok) {
      console.log("Event succesfully edited");
      onUpdate();
      onClose();
      toast({
        title: "Event edited",
        description: "You've successfully edited an event!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    toast({
      title: "Error",
      description: "Something went wrong editing the event...",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};
