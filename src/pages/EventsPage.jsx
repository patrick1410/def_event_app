import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { matchSorter } from "match-sorter";

import { AddEvent } from "../components/UI/AddEvent";
import { SearchBar } from "../components/UI/SearchBar";
import { SelectSort } from "../components/UI/SelectSort";
import { EventsList } from "../components/EventsList";
import { Box } from "@chakra-ui/react";

export const loader = async () => {
  try {
    const events = await fetch("http://localhost:3000/events");
    const categories = await fetch("http://localhost:3000/categories");

    return {
      events: await events.json(),
      categories: await categories.json(),
    };
  } catch (error) {
    console.log(error);
  }
};

export const EventsPage = () => {
  const [data, setData] = useState(useLoaderData());

  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [newEventAdded, setNewEventAdded] = useState(false);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await loader();
        setData(newData);
      } catch (error) {
        console.error(error);
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
      keys: ["title"],
    });
    setFilteredEvents(filtered);
    setSearchField(e.target.value);
  }; // Filter functie voor SearchBar component

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  }; // Sorteer functie voor SelectSort component

  return (
    <Box>
      <AddEvent setNewEventAdded={setNewEventAdded} />
      <SearchBar
        placeholder={"Search event by name..."}
        value={searchField}
        changeFn={handleFilter}
      />
      <SelectSort sortBy={sortBy} changeFn={handleSortChange} />
      <EventsList
        data={data}
        filteredEvents={filteredEvents}
        searchField={searchField}
        sortBy={sortBy}
      />
    </Box>
  );
};
