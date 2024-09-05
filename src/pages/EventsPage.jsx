import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { matchSorter } from "match-sorter";

import { AddEvent } from "../components/UI/AddEvent";
import { SearchBar } from "../components/UI/SearchBar";
import { SelectSort } from "../components/UI/SelectSort";
import { EventsList } from "../components/EventsList";
import { Box } from "@chakra-ui/react";

import { LoadingComponent } from "../components/UI/loadingComponent";

export const loader = async () => {
  try {
    const events = await fetch("https://event-api-prisma.onrender.com/events");
    const categories = await fetch(
      "https://event-api-prisma.onrender.com/categories"
    );

    return {
      events: await events.json(),
      categories: await categories.json(),
    };
  } catch (error) {
    console.error(error);
  }
};

export const EventsPage = () => {
  const initialData = useLoaderData(); // Haal initiële data op

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [newEventAdded, setNewEventAdded] = useState(false);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newData = await loader();
        setData(newData);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false);
    }

    if (newEventAdded) {
      setShouldFetchData(true);
      setNewEventAdded(false);
    }
  }, [newEventAdded]);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = matchSorter(data.events, value, {
      keys: ["title", "description"],
    });
    setFilteredEvents(filtered);
    setSearchField(e.target.value);
  }; // Filter functie voor SearchBar component

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  }; // Sorteer functie voor SelectSort component

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <Box>
      <AddEvent setNewEventAdded={setNewEventAdded} />
      <SearchBar
        placeholder={"Search event by name..."}
        value={searchField}
        changeFn={handleFilter}
      />
      <SelectSort data={data} sortBy={sortBy} changeFn={handleSortChange} />
      <EventsList
        data={data}
        filteredEvents={filteredEvents}
        searchField={searchField}
        sortBy={sortBy}
      />
    </Box>
  );
};
