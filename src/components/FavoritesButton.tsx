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
import { PDFDownloadLink, Text as PDFText } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

const FavoritesButton = () => {
  const { state } = useFavorites();
  const { favoritesList } = state;
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
          <DrawerHeader>
            <h1>Favorite events</h1>
          </DrawerHeader>

          <DrawerBody>
            <UnorderedList>
              {favoritesList.map((eventObj) => (
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
            {/* PDF Download Link */}
            {favoritesList.length > 0 && (
              <PDFDownloadLink
                document={
                  <PDFDocument
                    title="Favorite Events"
                    data={favoritesList}
                    renderItem={(eventObj) => (
                      <PDFText>{eventObj.short_title}</PDFText> // Custom rendering for each event
                    )}
                  />
                }
                fileName="favorite-events.pdf"
              >
                {({ loading }) => (
                  <Button
                    mt={4}
                    colorScheme="purple"
                    isLoading={loading}
                    loadingText="Generating PDF..."
                  >
                    Download PDF
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FavoritesButton;
