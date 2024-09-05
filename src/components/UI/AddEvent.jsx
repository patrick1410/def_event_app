import { convertToLocal } from "../../utils/manipulators";

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
  useToast,
} from "@chakra-ui/react";

import { getJWT } from "../../utils/getJWT";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";

import { useState } from "react";
import { useForm } from "react-hook-form";

export const AddEvent = ({ setNewEventAdded }) => {
  const userId = getUserIdFromToken();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      createdBy: userId,
    },
  });
  const [events, setEvents] = useState([]);

  const jwt = getJWT();
  const toast = useToast();

  const noPermission = () => {
    toast({
      title: "Access denied!",
      description: "You must be logged in to perform this action.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  const createEvent = async (event) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        "https://event-api-prisma.onrender.com/events",
        {
          method: "POST",
          body: JSON.stringify({
            createdBy: event.createdBy,
            title: event.title,
            description: event.description,
            image: event.image,
            categoryIds: event.categoryIds.map((id) => id.toString()),
            location: event.location,
            startTime: new Date(convertToLocal(event.startTime)),
            endTime: new Date(convertToLocal(event.endTime)),
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `${token}`,
          },
        }
      );
      const createdEvent = await response.json();
      setEvents([createdEvent, ...events]); // Add created event to events state
      setNewEventAdded(true); // Call setNewEventAdded to re-render
      onClose(); // Close modal
      toast({
        title: "Event Created",
        description: "Your event has been successfully created!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center>
      <Button
        backgroundColor="#bb86fc"
        color="#fff"
        _hover={{ backgroundColor: "#fff", color: "#bb86fc" }}
        transition="300ms ease-in"
        onClick={jwt ? onOpen : noPermission}
      >
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
