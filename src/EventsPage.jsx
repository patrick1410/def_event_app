import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { matchSorter } from "match-sorter";

import { AddEvent } from "./AddEvent";
import { SearchBar } from "./SearchBar";
import { SelectSort } from "./SelectSort";
import { EventsList } from "./EventsList";

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

  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading
  const [shouldFetchData, setShouldFetchData] = useState(false); // Initialize shouldFetchData
  const [newEventAdded, setNewEventAdded] = useState(false); // Initialize newEventAdded

  const [filteredEvents, setFilteredEvents] = useState([]); // Initialize filteredEvents
  const [searchField, setSearchField] = useState(""); // Initialize searchField
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await loader();
        setData(newData);
        setIsLoading(false); // Set isLoading to false after data is fetched
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
    <>
      <h1>EventsPage</h1>
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
        isLoading={isLoading}
      />
    </>
  );
};
