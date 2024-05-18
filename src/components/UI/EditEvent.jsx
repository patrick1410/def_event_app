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
  useToast,
  FormControl,
  FormLabel,
  Input,
  Box,
  HStack,
  Textarea,
} from "@chakra-ui/react";

import { editEvent } from "../../utils/requestHandlers";
import { useForm } from "react-hook-form";

export const EditEvent = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const { id } = data.events[0];
  const toast = useToast();

  return (
    <Box>
      <Button
        backgroundColor="#bb86fc"
        color="#fff"
        _hover={{ backgroundColor: "#fff", color: "#bb86fc" }}
        transition="300ms ease-in"
        w="6rem"
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
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
                {...register("location", { required: true })}
              />
              <FormLabel htmlFor="start-time">Start-time:</FormLabel>
              <Input
                type="datetime-local"
                id="start-time"
                {...register("startTime", { required: true })}
              />
              <FormLabel htmlFor="end-time">End-time:</FormLabel>
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
            <Button
              variant="ghost"
              onClick={() =>
                handleSubmit((event) => editEvent(id, event, onClose, toast))()
              }
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
