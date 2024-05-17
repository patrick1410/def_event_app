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
  FormControl,
  FormLabel,
  Input,
  Box,
  HStack,
  Textarea,
  Center,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";

export const AddEvent = ({ setNewEventAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const [events, setEvents] = useState([]);

  const createEvent = async (event) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify({
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
      const createdEvent = await response.json();
      setEvents([createdEvent, ...events]); // Voeg het gecreëerde evenement toe aan de staat
      setNewEventAdded(true); // Roep de functie aan om de EventsPage te informeren dat een nieuw evenement is toegevoegd
      onClose(); // Close modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center>
      <Button mt={5} onClick={onOpen}>
        Add Event
      </Button>
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
            <FormControl className="form">
              <FormLabel className="label" htmlFor="created-by">
                Created By:
              </FormLabel>
              <Input
                type="text"
                id="created-by"
                placeholder="Enter your name..."
                {...register("createdBy", { required: true })}
              />
              <FormLabel className="label" htmlFor="title">
                Event:
              </FormLabel>
              <Input
                type="text"
                id="title"
                placeholder="Enter a title..."
                {...register("title", { required: true })}
              />
              <FormLabel className="label" htmlFor="description">
                Description:
              </FormLabel>
              <Textarea
                id="description"
                cols="30"
                rows="5"
                placeholder="Enter a description..."
                {...register("description", { required: true })}
              ></Textarea>
              <FormLabel className="label" htmlFor="image">
                Image:
              </FormLabel>
              <Input
                type="url"
                id="image"
                placeholder="Enter an image URL..."
                {...register("image", { required: true })}
              />
              <FormLabel className="label">Categories:</FormLabel>
              <HStack spacing={24}>
                <Box>
                  <input
                    type="checkbox"
                    id="category-sports"
                    name="category-sports"
                    value={1}
                    {...register("categoryIds", { required: true })}
                  />
                  <label htmlFor="category-sports">Sports</label>
                </Box>
                <Box>
                  <input
                    type="checkbox"
                    id="category-games"
                    name="category-games"
                    value={2}
                    {...register("categoryIds", { required: true })}
                  />
                  <label htmlFor="category-games">Games</label>
                </Box>
                <Box>
                  <input
                    type="checkbox"
                    id="category-relaxation"
                    name="category-relaxation"
                    value={3}
                    {...register("categoryIds", { required: true })}
                  />
                  <label htmlFor="category-relaxation">Relaxation</label>
                </Box>
              </HStack>
              <FormLabel className="label" htmlFor="location">
                Location:
              </FormLabel>
              <Input
                type="text"
                id="location"
                placeholder="Enter a location..."
                {...register("location", { required: true })}
              />
              <FormLabel className="label" htmlFor="start-time">
                Start-time:
              </FormLabel>
              <Input
                type="datetime-local"
                id="start-time"
                {...register("startTime", { required: true })}
              />
              <FormLabel className="label" htmlFor="end-time">
                End-time:
              </FormLabel>
              <Input
                type="datetime-local"
                id="end-time"
                {...register("endTime", { required: true })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit(createEvent)}>
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};
