import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";

export const EditEvent = ({ data }) => {
  console.log();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const [originalData, setOriginalData] = useState(data.events[0]);

  const editEvent = async (event) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: event.id,
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
      const updatedData = await response.json();
      setOriginalData([updatedData]); // Voeg het gecreëerde evenement toe aan de staat
      onClose(); // Close modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={onOpen}>Add Event</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <label htmlFor="created-by">Created By:</label>
              <input
                type="text"
                id="created-by"
                placeholder="Enter your name..."
                {...register("createdBy", { required: true })}
              />
              <label htmlFor="title">Event:</label>
              <input
                type="text"
                id="title"
                placeholder="Enter a title..."
                {...register("title", { required: true })}
              />
              <label htmlFor="description">Description:</label>
              <textarea
                name=""
                id="description"
                cols="30"
                rows="5"
                placeholder="Enter a description..."
                {...register("description", { required: true })}
              ></textarea>
              <label htmlFor="image">Image:</label>
              <input
                type="url"
                id="image"
                {...register("image", { required: true })}
              />
              <label htmlFor="category">Category:</label>
              <div>
                <div>
                  <input
                    type="checkbox"
                    id="category-sports"
                    name="category-sports"
                    value={1}
                    {...register("categoryIds", { required: true })}
                  />
                  <label htmlFor="category">Sports</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="category-games"
                    name="category-games"
                    value={2}
                    {...register("categoryIds", { required: true })}
                  />
                  <label htmlFor="category">Games</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="category-relaxation"
                    name="category-relaxation"
                    value={3}
                    {...register("categoryIds", { required: true })}
                  />
                  <label htmlFor="category">Relaxation</label>
                </div>
              </div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                {...register("location", { required: true })}
              />
              <label htmlFor="start-time">Start-time:</label>
              <input
                type="datetime-local"
                name=""
                id="start-time"
                {...register("startTime", { required: true })}
              />
              <label htmlFor="end-time">End-time:</label>
              <input
                type="datetime-local"
                name=""
                id="end-time"
                {...register("endTime", { required: true })}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleSubmit(editEvent(data.events[0]))}
            >
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
