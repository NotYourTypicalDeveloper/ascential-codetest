import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../lib/contexts/FavoritesContext";
import { StarIcon } from "@chakra-ui/icons";

const FavoritesButton = () => {
  const { state } = useFavorites();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="purple" onClick={onOpen}>
        Favorites <StarIcon ml={2} color="yellow" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favorite events</DrawerHeader>

          <DrawerBody>
            <UnorderedList>
              {state.favoritesList.map((eventObj) => (
                <ListItem
                  key={`fav-event-${eventObj.id}`}
                  _hover={{ textDecor: "underline", color: "blue" }}
                >
                  <Link to={`/events/${eventObj.id}`}>
                    {eventObj.short_title}
                  </Link>{" "}
                </ListItem>
              ))}
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FavoritesButton;
