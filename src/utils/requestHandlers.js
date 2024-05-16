// deleteEvent function
export const deleteEvent = async (eventId) => {
  try {
    if (confirm("Are you sure you want to delete the event?")) {
      console.log("Deleting event with ID:", eventId);

      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

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
