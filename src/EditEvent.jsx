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
} from "@chakra-ui/react";

import { editEvent } from "./utils/requestHandlers";
import { useForm } from "react-hook-form";

export const EditEvent = ({ data }) => {
  console.log();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const { id } = data.events[0];

  const toast = useToast();

  return (
    <div>
      <Button onClick={onOpen}>Edit Event</Button>
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
              onClick={() =>
                handleSubmit((event) => editEvent(id, event, onClose, toast))()
              }
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
