import { useNavigate, useParams } from "react-router-dom";
import { useInstruments } from "../../hooks/use.instruments";
import { SyntheticEvent, useEffect } from "react";
import "./instrumentForm.scss";
import Swal from "sweetalert2";
import { Instrument } from "../../models/instrument";

export default function InstrumentForm() {
  const navigate = useNavigate();
  const {
    handleCreateInstrument,
    handleUpdateInstrument,
    instruments,
    handleLoadInstruments,
  } = useInstruments();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const existingInstrument: Instrument = instruments.find(
        (instrument) => instrument.id === id
      ) as Instrument;
      if (!existingInstrument) {
        handleLoadInstruments();
      }

      if (existingInstrument) {
        const form = document.querySelector(
          ".instrument-form"
        ) as HTMLFormElement;
        (form.elements.namedItem("inventor") as HTMLInputElement).value =
          existingInstrument.inventor;
        (form.elements.namedItem("name") as HTMLInputElement).value =
          existingInstrument.name;
        (form.elements.namedItem("developed") as HTMLInputElement).value =
          existingInstrument.developed;
        (
          form.elements.namedItem("shortDescription") as HTMLInputElement
        ).value = existingInstrument.shortDescription;
        (form.elements.namedItem("classification") as HTMLInputElement).value =
          existingInstrument.classification;
        (form.elements.namedItem("video") as HTMLInputElement).value =
          existingInstrument.video;
      }
    }
  }, [id, instruments, handleLoadInstruments]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const instrumentForm = event.target as HTMLFormElement;
    const instrumentData = new FormData(instrumentForm);

    if (id) {
      await handleUpdateInstrument(id, instrumentData);
    } else {
      await handleCreateInstrument(instrumentData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "SUCCESS!!",
        text: "The instrument has been updated correctly",
        background:
          "linear-gradient(to right, rgba(100, 100, 100), rgba(70, 70, 70))",
        color: "white",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    navigate("/");
    instrumentForm.reset();
  };
  return (
    <div className="instrument-form-container">
      <div className="image-container">
        <img src="../../../../diapason.jpg" alt="background image" />

        <span className="first-span-above-image">DISCOVER UNIQUE</span>
        <span className="second-span-above-image">MUSICAL TREASURES</span>
      </div>
      <form
        aria-label="form"
        className="instrument-form"
        id="instrument-form"
        onSubmit={handleSubmit}
      >
        {id ? (
          <h2 className="title-form">Edit</h2>
        ) : (
          <h2 className="title-form">Add</h2>
        )}
        <h3>SPECIFICATIONS</h3>
        <label className="inventor" htmlFor="inventor">
          Inventor(s):{" "}
        </label>
        <input type="text" placeholder="Unknown" name="inventor"></input>
        <label className="instrument" htmlFor="instrument">
          Instrument:{" "}
        </label>
        <input
          type="text"
          placeholder="Name of the instrument"
          name="name"
        ></input>
        <label className="developed" htmlFor="developed">
          Developed in:{" "}
        </label>
        <input type="text" placeholder="1920" name="developed"></input>
        <label className="short-description" htmlFor="shortDescription">
          Short description:{" "}
        </label>
        <input
          type="textarea"
          placeholder="..."
          name="shortDescription"
        ></input>
        <label className="classification" htmlFor="classification">
          Classification:{" "}
        </label>
        <select name="classification">
          <option value="aerophones">Aerophones</option>
          <option value="chordophones">Chordophones</option>

          <option value="membranophones">Membranophones</option>
          <option value="idiophones">Idiophones</option>
          <option value="electrophones">Electrophones</option>
          <option value="other">Others</option>
        </select>
        <label className="image" htmlFor="image">
          Image:{" "}
        </label>
        <input type="file" name="image"></input>
        <label className="video" htmlFor="video">
          Video:{" "}
        </label>
        <input
          name="video"
          type="text"
          placeholder="Ex. https://www.youtube.com/watch?v=4fezP875xOQ"
        />
        {id ? (
          <button type="submit">Save Changes</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}
