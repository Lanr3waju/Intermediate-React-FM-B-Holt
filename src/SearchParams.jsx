import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: '',
    })
    const [animal, setAnimal] = useState("");
    const breeds = [useBreedList(animal)];
    const [adoptedPet] = useContext(AdoptedPetContext);

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return (
        <div className="my-0 mx-auto w-11/12">
            <form
                className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col items-center justify-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    // new ForData is a browser APi that fetches the data from a from into an object
                    const formData = new FormData(e.target);
                    const obj = {
                        animal: formData.get("animal") ?? "",
                        breed: formData.get("breed") ?? "",
                        location: formData.get("location") ?? "",
                    };
                    setRequestParams(obj)
                }}>
                {
                    adoptedPet && (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    )
                }
                <label htmlFor="location">
                    Location
                    <input id="location"
                        type="text"
                        className="w-60 block mb-5"
                        name="location"
                        placeholder="location" />

                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name="animal"
                        className="w-60 block mb-5"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        className="w-60 block mb-5 disabled:opacity-40"
                        name="breed"
                    >
                        <option />
                        {breeds[0][0].map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="rounded px-6 py-2 opacity-70 text-white hover:opacity-100 border-none bg-orange-500">Submit</button>
            </form>
            {
                <Results pets={pets} />
            }
        </div>
    );
};

export default SearchParams;