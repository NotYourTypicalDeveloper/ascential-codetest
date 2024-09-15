import React from "react";
import {
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  Stack,
  Image,
  LinkBox,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Error from "./Error";
import { useSeatGeek } from "../utils/useSeatGeek";
import { formatDateTime } from "../utils/formatDateTime";
import { StarIcon } from "@chakra-ui/icons";

import {
  FavoritesProvider,
  useFavorites,
} from "../lib/contexts/FavoritesContext";
import FavoritesButton from "./FavoritesButton";

export interface Performers {
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
}

export interface EventProps {
  id: string;
  short_title: string;
  datetime_utc: Date;
  datetime_local: Date;
  performers: Performers[];
  venue: Venue;
}

interface EventItemProps {
  event: EventProps;
}

const Events: React.FC = () => {
  const { data, error } = useSeatGeek("/events", {
    type: "concert",
    sort: "score.desc",
    per_page: "24",
  });

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <FavoritesProvider>
      <Flex alignItems="center" justifyContent="space-between" mr={6}>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Events" }]}
        />
        <FavoritesButton />
      </Flex>
      <SimpleGrid spacing="6" m="6" minChildWidth="350px">
        {data.events?.map((event: EventProps) => (
          <EventItem key={event.id.toString()} event={event} />
        ))}
      </SimpleGrid>
    </FavoritesProvider>
  );
};

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { state, dispatch } = useFavorites();
  const isFavorite = state.favoritesList.some((fav) => fav.id === event.id);

  const handleFavClick = (eventObj: EventProps) => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: eventObj.id });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: eventObj });
    }
  };
  return (
    <LinkBox
      as={Card}
      variant="outline"
      overflow="hidden"
      bg="gray.50"
      borderColor="gray.200"
      _hover={{ bg: "gray.100" }}
    >
      <Image src={event.performers[0].image} />
      <CardBody>
        <Stack spacing="2">
          <Heading size="md">
            <Link to={`/events/${event.id}`}>{event.short_title}</Link>
          </Heading>
          <IconButton
            aria-label="Add to favorites"
            icon={<StarIcon color={isFavorite ? "orange" : "lightGrey"} />}
            onClick={() => handleFavClick(event)}
            w="fit-content"
          />
          <Box>
            <Text fontSize="sm" color="gray.600">
              {event.venue.name_v2}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {event.venue.display_location}
            </Text>
          </Box>
          <Tooltip
            label={formatDateTime(event.datetime_utc)}
            placement="bottom-start"
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="gray.600"
              justifySelf="end"
            >
              {formatDateTime(event.datetime_local)}
            </Text>
          </Tooltip>
        </Stack>
      </CardBody>
    </LinkBox>
  );
};

export default Events;
