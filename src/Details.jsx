/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import Modal from "./Modal";

const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);


    const { id } = useParams();
    const results = useQuery(["details", id], fetchPet);

    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">⚽</h2>
            </div>
        )
    }

    const pet = results.data.pets[0];

    return (
        <div className="p-2">
            <Carousel images={pet.images} />
            <h1>{pet.name}</h1>
            <h2>
                {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
                <button className="block py-2 px-4 bg-orange-300 hover:bg-orange-600 cursor-pointer m-3 rounded-xl shadow-lg shadow-orange-700" onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                <p>{pet.description}</p>
                {
                    showModal &&
                    (
                        <Modal>
                            <div className="absolute w-full bg-orange-600 h-full flex justify-center items-center flex-col font-bold text-3xl text-white rounded-2xl shadow-lg shadow-zinc-400">
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button className="bg-gray-200 text-black rounded-md p-4 m-2" onClick={() => {
                                        setAdoptedPet(pet);
                                        navigate("/");
                                    }}>Yes</button>
                                    <button className="bg-gray-200 text-black rounded-md p-4 m-2" onClick={() => setShowModal(false)}>No</button>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </h2>
        </div>
    );
};

function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details
                {...props}
            />
        </ErrorBoundary>
    );
}

export default DetailsErrorBoundary;