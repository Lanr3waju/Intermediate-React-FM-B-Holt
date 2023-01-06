import { useState } from "react"
function Carousel({ images }) {
    const [active, setActive] = useState(0)

    const handleIndexClick = (e) => {
        setActive(+e.target.dataset.index)
    }

    return (
        <div className="flex m-2">
            <img className=" rounded-lg w-1/5" src={images[active] || "https://pets-images.dev-apis.com/pets/none.jpg"} alt="animal hero" />
            <div className="flex">
                {images.map((photo, index) => (
                    // eslint-disable-next-line
                    <img
                        onClick={handleIndexClick}
                        data-index={index}
                        key={photo}
                        src={photo}
                        className={index === active ? "active w-2/12 m-4 rounded-full border-8 border-t-emerald-600 border-gray-500 cursor-pointer" : " m-4 border-8 border-gray-400 cursor-pointer rounded-full w-2/12"}
                        alt="animal thumbnail"
                    />
                ))}

            </div>
        </div >
    )
}

export default Carousel