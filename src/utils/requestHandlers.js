// deleteEvent functie
export const deleteEvent = async (id) => {
  try {
    if (confirm("Are you sure you want to delete the event?")) {
      console.log("Deleting event with ID:", id);

      const response = await fetch(
        `https://event-api-prisma.onrender.com/events/${id}`,
        {
          method: "DELETE",
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
export const editEvent = async (eventId, event, onClose, toast) => {
  try {
    console.log("Editing event with ID:", eventId);

    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify({
        id: eventId,
        createdBy: event.createdBy,
        title: event.title,
        description: event.description,
        image: event.image,
        categoryIds: event.categoryIds.map((id) => parseInt(id)),
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
      }),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (response.ok) {
      console.log("Event succesfully edited");
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
